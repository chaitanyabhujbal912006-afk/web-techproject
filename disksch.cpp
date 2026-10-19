#include <algorithm>
#include <climits>
#include <iostream>
#include <vector>
using namespace std;

void printResult(const string &name, const vector<int> &order, int head) {
  cout << "\n--- " << name << " ---\n";
  cout << "Order: " << head;
  int totalSeek = 0, prev = head;
  for (int track : order) {
    cout << " -> " << track;
    totalSeek += abs(track - prev);
    prev = track;
  }
  cout << "\nTotal Seek Time: " << totalSeek << "\n";
}

vector<int> fifo(const vector<int> &requests) { return requests; }

vector<int> sstf(const vector<int> &requests, int head) {
  vector<int> pending(requests), order;
  while (!pending.empty()) {
    int best = 0;
    for (int i = 1; i < (int)pending.size(); ++i) {
      if (abs(pending[i] - head) < abs(pending[best] - head))
        best = i;
    }
    head = pending[best];
    order.push_back(head);
    pending.erase(pending.begin() + best);
  }
  return order;
}

// SCAN and C-SCAN use tracks 0 through diskSize-1.
// direction = 1 means move toward higher-numbered tracks first.
// direction = 0 means move toward lower-numbered tracks first.
vector<int> scan(const vector<int> &requests, int head, int diskSize,
                 int direction) {
  vector<int> left, right, order;
  for (int track : requests) {
    if (track < head)
      left.push_back(track);
    else if (track > head)
      right.push_back(track);
    else
      order.push_back(track);
  }
  sort(left.begin(), left.end());
  sort(right.begin(), right.end());

  if (direction == 1) {
    order.insert(order.end(), right.begin(), right.end());
    if (!right.empty() || !left.empty()) {
      if (order.empty() || order.back() != diskSize - 1)
        order.push_back(diskSize - 1);
    }
    reverse(left.begin(), left.end());
    order.insert(order.end(), left.begin(), left.end());
  } else {
    reverse(left.begin(), left.end());
    order.insert(order.end(), left.begin(), left.end());
    if (!right.empty() || !left.empty()) {
      if (order.empty() || order.back() != 0)
        order.push_back(0);
    }
    order.insert(order.end(), right.begin(), right.end());
  }
  return order;
}

vector<int> cscan(const vector<int> &requests, int head, int diskSize,
                  int direction) {
  vector<int> left, right, order;
  for (int track : requests) {
    if (track < head)
      left.push_back(track);
    else if (track > head)
      right.push_back(track);
    else
      order.push_back(track);
  }
  sort(left.begin(), left.end());
  sort(right.begin(), right.end());

  if (direction == 1) {
    order.insert(order.end(), right.begin(), right.end());
    if (!right.empty() || !left.empty()) {
      if (order.empty() || order.back() != diskSize - 1)
        order.push_back(diskSize - 1);
      order.push_back(0);
    }
    order.insert(order.end(), left.begin(), left.end());
  } else {
    reverse(left.begin(), left.end());
    order.insert(order.end(), left.begin(), left.end());
    if (!right.empty() || !left.empty()) {
      if (order.empty() || order.back() != 0)
        order.push_back(0);
      order.push_back(diskSize - 1);
    }
    reverse(right.begin(), right.end());
    order.insert(order.end(), right.begin(), right.end());
  }
  return order;
}

int main() {
  int n, head, diskSize, direction;
  cout << "Enter number of disk requests: ";
  if (!(cin >> n) || n <= 0) {
    cout << "Invalid number of requests.\n";
    return 1;
  }

  vector<int> requests(n);
  cout << "Enter the request track numbers (space-separated): ";
  for (int i = 0; i < n; ++i) {
    if (!(cin >> requests[i])) {
      cout << "Invalid request input.\n";
      return 1;
    }
  }

  cout << "Enter initial head position: ";
  if (!(cin >> head)) {
    cout << "Invalid head position.\n";
    return 1;
  }
  cout << "Enter disk size (number of tracks, tracks are 0 to disk size - 1): ";
  if (!(cin >> diskSize) || diskSize <= 0) {
    cout << "Invalid disk size.\n";
    return 1;
  }

  if (head < 0 || head >= diskSize) {
    cout << "Error: head position must be between 0 and " << diskSize - 1
         << ".\n";
    return 1;
  }
  for (int track : requests) {
    if (track < 0 || track >= diskSize) {
      cout << "Error: every request must be between 0 and " << diskSize - 1
           << ".\n";
      return 1;
    }
  }

  cout << "Initial direction for SCAN/C-SCAN (1 = higher tracks, 0 = lower "
          "tracks): ";
  if (!(cin >> direction) || (direction != 0 && direction != 1)) {
    cout << "Invalid direction. Enter 1 or 0.\n";
    return 1;
  }

  printResult("FIFO (First In First Out)", fifo(requests), head);
  printResult("SSTF (Shortest Seek Time First)", sstf(requests, head), head);
  printResult("SCAN (Elevator Algorithm)",
              scan(requests, head, diskSize, direction), head);
  printResult("C-SCAN (Circular SCAN)",
              cscan(requests, head, diskSize, direction), head);

  return 0;
}