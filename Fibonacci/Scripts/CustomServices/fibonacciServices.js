function FibonacciList(n) {
    var arr = [0, 1];

    if (n <= 2) return 1;

    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
       // arr.push(arr[i-1] + arr[i-2])
    }

    return arr;
}