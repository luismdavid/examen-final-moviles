import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  array = [
    { id: 72, name: 'David Beckham' },
    [
      [
        { id: 11, name: 'Brad Pitt' },
        { id: 1, name: 'Alexandra Daddario' },
      ],
      { id: 19, name: 'Michael Myers' },
    ],
    [[[{ id: 33, name: 'Matthew Heafy' }]]],
    [
      [
        { id: 4, name: 'John Petrucci' },
        { id: 55, name: 'Wayne Rooney' },
      ],
      [
        { id: 57, name: 'Garbeil Tronpis' },
        { id: 10, name: 'Donald Trump' },
        [{ id: 69, name: '[Object object]' }],
      ],
      { id: 13, name: 'Ester Exposito' },
      [
        [
          { id: 3, name: 'Jordan Rudess' },
          { id: 8, name: 'Michael Jackson' },
        ],
        { id: 99, name: 'undefined undefined' },
      ],
      { id: 47, name: 'Raul Garcia' },
      { id: 40, name: 'Benito Martinez' },
    ],
    [
      { id: 68, name: 'Lionel Messi' },
      { id: 84, name: 'Kobe Bryant' },
      { id: 71, name: 'Gilgamesh' },
      [
        { id: 7, name: 'Miyamoto Musashi' },
        [{ id: 23, name: 'Arthur Pendragon' }],
        [{ id: 5, name: 'Bedivere' }],
        { id: 96, name: 'Lord Valdomero' },
        { id: 18, name: 'Literalmente nadie' },
      ],
    ],
  ];
  currentTime = 0;
  bestTime = Infinity;
  bestAlgo = '';

  setMetrics(time: number, algorithm) {
    time = Number(time.toFixed(4));
    this.currentTime = time;
    if (time < this.bestTime) {
      this.bestTime = time;
      this.bestAlgo = algorithm;
    }
  }

  quickSort() {
    const getPivot = (arr, start = 0, end = arr.length + 1) => {
      const swap = (array, x, y) => {
        let temp = array[x];
        if (x == 2) {
          debugger;
        }
        array[x] = array[y];
        array[y] = temp;
      };

      let pivot = arr[start];
      let pointer = start;

      for (let i = start; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
          arr[i] = quickSort(arr[i]);
        } else if (arr[i].id < pivot.id) {
          swap(arr, pointer, i);
          pointer++;
        }
      }

      return pointer;
    };

    const quickSort = (arr, start = 0, end = arr.length) => {
      let pivotIndex = getPivot(arr, start, end);
      if (start >= end) return arr;
      quickSort(arr, start, pivotIndex);
      quickSort(arr, pivotIndex + 1, end);

      return arr;
    };
    var t0 = performance.now();
    this.array = quickSort(this.array);
    var t1 = performance.now();
    this.setMetrics(t1 - t0, 'quicksort');
  }

  tree() {
    var t0 = performance.now();
    let tree = new GFG();
    tree.treeins(this.array);
    tree.inorderRec(tree.root);
    var t1 = performance.now();
    this.setMetrics(t1 - t0, 'tree');
  }

  constructor() {}
}

class Node {
  key: { id: number };
  left: Node;
  right: Node;

  constructor(item: { id: number }) {
    this.key = item;
    this.left = this.right = null;
  }
}

class GFG {
  root: Node;

  constructor() {
    this.root = null;
  }

  public insert(key: { id: number }): void {
    this.root = this.insertRec(this.root, key);
  }
  insertRec(root: Node, key: { id: number }): Node {
    if (root == null) {
      root = new Node(key);
      return root;
    }

    if (key.id < root.key.id) root.left = this.insertRec(root.left, key);
    else if (key.id > root.key.id) root.right = this.insertRec(root.right, key);

    return root;
  }

  inorderRec(root: Node): void {
    if (root != null) {
      this.inorderRec(root.left);
      this.inorderRec(root.right);
    }
  }
  treeins(arr: any[]): void {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        let tree = new GFG();
        tree.treeins(arr[i]);
        tree.inorderRec(tree.root);
      } else {
        this.insert(arr[i]);
      }
    }
  }
}
