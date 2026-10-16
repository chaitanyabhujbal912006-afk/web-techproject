import numpy as np
import matplotlib.pyplot as plt

# Dataset: 12 samples, 2 features
X = np.array([
    [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],        # Class -1
    [7, 2], [8, 3], [9, 4], [10, 5], [11, 6], [12, 7]      # Class +1
])

# Class labels must be -1 and +1 for SVM
y = np.array([-1, -1, -1, -1, -1, -1,
               1,  1,  1,  1,  1,  1])


# SVM training using gradient descent
def train_svm(X, y, learning_rate=0.001, lambda_param=0.01, epochs=1000):
    n_samples, n_features = X.shape
    w = np.zeros(n_features)
    b = 0

    for epoch in range(epochs):
        for i in range(n_samples):
            condition = y[i] * (np.dot(X[i], w) + b)

            if condition >= 1:
                dw = 2 * lambda_param * w
                db = 0
            else:
                dw = 2 * lambda_param * w - y[i] * X[i]
                db = -y[i]

            w = w - learning_rate * dw
            b = b - learning_rate * db

    return w, b


w, b = train_svm(X, y)

print("Weights:", w)
print("Bias:", b)


# Prediction
def predict(X, w, b):
    return np.sign(np.dot(X, w) + b)


predictions = predict(X, w, b)

print("\nActual Labels:")
print(y)
print("\nPredicted Labels:")
print(predictions)

accuracy = np.mean(predictions == y)
print("\nAccuracy:", accuracy * 100, "%")


# Plot data and decision boundary
plt.figure(figsize=(8, 6))
plt.scatter(X[y == -1, 0], X[y == -1, 1], label="Class -1")
plt.scatter(X[y == 1, 0], X[y == 1, 1], label="Class +1")

x_values = np.linspace(X[:, 0].min() - 1, X[:, 0].max() + 1, 100)
y_values = -(w[0] * x_values + b) / w[1]
plt.plot(x_values, y_values, label="Decision Boundary")

plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.title("Linear SVM From Scratch")
plt.legend()
plt.grid(True)
plt.show()
