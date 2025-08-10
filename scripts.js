document.addEventListener("DOMContentLoaded", () => {
    const arrayContainer = document.getElementById("array");
    const sortButton = document.getElementById("sort-button");
    const algorithmSelect = document.getElementById("algorithm-select");
    const algorithmName = document.getElementById("algorithm-name");
    const algorithmDescription = document.getElementById("algorithm-description");

    const array = generateRandomArray(30, 1, 100);
    renderArray(array);

    algorithmSelect.addEventListener("change", () => {
        const selectedAlgorithm = algorithmSelect.value;
        updateAlgorithmDescription(selectedAlgorithm);
    });

    sortButton.addEventListener("click", () => {
        const selectedAlgorithm = algorithmSelect.value;
        const algorithms = {
            "bubble-sort": bubbleSort,
            "selection-sort": selectionSort,
            "insertion-sort": insertionSort,
            "merge-sort": mergeSort,
            "quick-sort": quickSort
        };
        algorithms[selectedAlgorithm](array, renderArray);
    });

    function generateRandomArray(size, min, max) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    function renderArray(arr) {
        arrayContainer.innerHTML = "";
        arr.forEach((value) => {
            const bar = document.createElement("div");
            bar.classList.add("array-bar");
            bar.style.height = `${value * 2}px`;
            bar.textContent = value;
            arrayContainer.appendChild(bar);
        });
    }

    function updateAlgorithmDescription(algorithm) {
        const descriptions = {
            "bubble-sort": "Bubble Sort is a simple comparison-based algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order.",
            "selection-sort": "Selection Sort is an in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.",
            "insertion-sort": "Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
            "merge-sort": "Merge Sort is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output.",
            "quick-sort": "Quick Sort is an efficient sorting algorithm. It is also known as partition-exchange sort. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot."
        };
        algorithmName.textContent = algorithm.replace(/-/g, " ").toUpperCase();
        algorithmDescription.textContent = descriptions[algorithm];
    }

    async function bubbleSort(arr, render) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    render(arr);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }
            }
        }
    }

    async function selectionSort(arr, render) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                render(arr);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }
    }

    async function insertionSort(arr, render) {
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                render(arr);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            arr[j + 1] = key;
        }
    }

    async function mergeSort(arr, render) {
        await mergeSortHelper(arr, 0, arr.length - 1, render);
    }

    async function mergeSortHelper(arr, left, right, render) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await mergeSortHelper(arr, left, mid, render);
            await mergeSortHelper(arr, mid + 1, right, render);
            await merge(arr, left, mid, right, render);
        }
    }

    async function merge(arr, left, mid, right, render) {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[mid + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }

        render(arr);
        await new Promise((resolve) => setTimeout(resolve, 50));
    }

    async function quickSort(arr, render) {
        await quickSortHelper(arr, 0, arr.length - 1, render);
    }

    async function quickSortHelper(arr, low, high, render) {
        if (low < high) {
            const pi = await partition(arr, low, high, render);
            await quickSortHelper(arr, low, pi - 1, render);
            await quickSortHelper(arr, pi + 1, high, render);
        }
    }

    async function partition(arr, low, high, render) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                render(arr);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        render(arr);
        await new Promise((resolve) => setTimeout(resolve, 50));
        return i + 1;
    }

    updateAlgorithmDescription(algorithmSelect.value);
});
