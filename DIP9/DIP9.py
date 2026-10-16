# Assignment 9 - Feature matching using SIFT and ORB
# Name: Chaitanya Bhujbal   PRN: 1012411021

import cv2
import numpy as np
import matplotlib.pyplot as plt
import time

# ---- Step 1: read the two images ----
img1 = cv2.imread("img1.jpeg")
img2 = cv2.imread("img2.jpeg")

# if second image is not given, make it by rotating and shrinking first image
if img2 is None:
    print("img2.jpg not found, creating a rotated + scaled copy of img1")
    h, w = img1.shape[:2]
    M = cv2.getRotationMatrix2D((w / 2, h / 2), 30, 0.7)
    img2 = cv2.warpAffine(img1, M, (w, h))

print("Image 1 size:", img1.shape)
print("Image 2 size:", img2.shape)

# convert to gray
gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

# ---- Step 2: SIFT ----
start = time.time()
sift = cv2.SIFT_create()
kp1, des1 = sift.detectAndCompute(gray1, None)
kp2, des2 = sift.detectAndCompute(gray2, None)

# brute force matcher with L2 distance
bf = cv2.BFMatcher(cv2.NORM_L2)
matches = bf.knnMatch(des1, des2, k=2)

# ratio test (Lowe)
good_sift = []
for m, n in matches:
    if m.distance < 0.75 * n.distance:
        good_sift.append(m)
good_sift = sorted(good_sift, key=lambda x: x.distance)
sift_time = time.time() - start

print("\n--- SIFT ---")
print("Keypoints in image 1:", len(kp1))
print("Keypoints in image 2:", len(kp2))
print("Descriptor size:", des1.shape[1])
print("Good matches:", len(good_sift))
print("Time taken: %.3f sec" % sift_time)

# ---- Step 3: ORB ----
start = time.time()
orb = cv2.ORB_create(nfeatures=1500)
kp3, des3 = orb.detectAndCompute(gray1, None)
kp4, des4 = orb.detectAndCompute(gray2, None)

# brute force matcher with hamming distance (ORB is binary)
bf2 = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
orb_matches = bf2.match(des3, des4)
orb_matches = sorted(orb_matches, key=lambda x: x.distance)
orb_time = time.time() - start

print("\n--- ORB ---")
print("Keypoints in image 1:", len(kp3))
print("Keypoints in image 2:", len(kp4))
print("Descriptor size (bytes):", des3.shape[1])
print("Matches:", len(orb_matches))
print("Time taken: %.3f sec" % orb_time)

# ---- Step 4: RANSAC to count correct matches (inliers) ----
def count_inliers(k1, k2, mt):
    src = np.float32([k1[m.queryIdx].pt for m in mt]).reshape(-1, 1, 2)
    dst = np.float32([k2[m.trainIdx].pt for m in mt]).reshape(-1, 1, 2)
    H, mask = cv2.findHomography(src, dst, cv2.RANSAC, 5.0)
    return int(mask.sum())

print("\nSIFT inliers:", count_inliers(kp1, kp2, good_sift))
print("ORB inliers :", count_inliers(kp3, kp4, orb_matches))

# ---- Step 5: show the results ----
# keypoints of image 1
kp_img = cv2.drawKeypoints(img1, kp1, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# draw top 50 matches
sift_img = cv2.drawMatches(img1, kp1, img2, kp2, good_sift[:50], None, flags=2)
orb_img = cv2.drawMatches(img1, kp3, img2, kp4, orb_matches[:50], None, flags=2)

plt.figure(figsize=(6, 6))
plt.imshow(cv2.cvtColor(kp_img, cv2.COLOR_BGR2RGB))
plt.title("SIFT keypoints on image 1")
plt.axis("off")
plt.savefig("keypoints.png")

plt.figure(figsize=(10, 9))
plt.subplot(2, 1, 1)
plt.imshow(cv2.cvtColor(sift_img, cv2.COLOR_BGR2RGB))
plt.title("SIFT matches (top 50 of %d)" % len(good_sift))
plt.axis("off")
plt.subplot(2, 1, 2)
plt.imshow(cv2.cvtColor(orb_img, cv2.COLOR_BGR2RGB))
plt.title("ORB matches (top 50 of %d)" % len(orb_matches))
plt.axis("off")
plt.tight_layout()
plt.savefig("matches.png")
plt.show()