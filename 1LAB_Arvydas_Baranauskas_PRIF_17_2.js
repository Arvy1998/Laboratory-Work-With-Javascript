/* 1 UZD ------------------------------------------------------------- */

class LaboratorinisVienas {
    
    constructor() { }

    main = async () => {

/* 2 UZD ------------------------------------------------------------- */

    /* 
        Arvydas Baranauskas
        Grupe: PRIf-17/2
        Stud. knyg. nr.: 20172796
    */

    /* 3 UZD ------------------------------------------------------------- */

    const NAME = 'Arvydas';
    const SURNAME = 'Baranauskas';

    const NAME_LENGTH = NAME.length;
    const SURNAME_LENGTH = SURNAME.length;

    function getOccurenceOfCharA(name, surname) {
        let NAME_SURNAME = name + surname;
        let counter = 0;
        NAME_SURNAME.split('').forEach(function(letter) {
            if (letter === 'a' || letter === 'A') {
                counter++;
            }
        });
        return counter;
    }

    const OCCURENCE_OF_CHAR_A = getOccurenceOfCharA(NAME, SURNAME);
    const NAME_SURNAME_LENGTH_SUM = NAME_LENGTH + SURNAME_LENGTH;

    // rows => n // columns => m //
    function createMatrix(rows, columns) {
        let emptyMatrix = new Array(rows);
        for (let iterator = 0; iterator < rows; iterator++) {
            emptyMatrix[iterator] = new Array(columns).fill(null);
        }
        return emptyMatrix;
    }

    let matrix = createMatrix(NAME_LENGTH, SURNAME_LENGTH);

    /* 4 UZD ------------------------------------------------------------- */

    function getRandomIntBetweenRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillArrayWithRandomArbitrary(matrix) {
        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                matrix[rowIndex][columnIndex] = getRandomIntBetweenRange(OCCURENCE_OF_CHAR_A, NAME_SURNAME_LENGTH_SUM);
            });
        });
    }

    fillArrayWithRandomArbitrary(matrix);

    /* 5 UZD ------------------------------------------------------------- */

    const WHITE_SPACE = ' ';
    const DOUBLE_WHITE_SPACE = '  ';
    const NEW_LINE = '\n';

    let tableOfMatrixValues = '';

    function formTableWithMatrixValuesWithIndexes(matrix, table) {
        tableOfMatrixValues += DOUBLE_WHITE_SPACE;

        for (let iterator = 0; iterator < SURNAME_LENGTH; iterator++) {
            tableOfMatrixValues += WHITE_SPACE + iterator + WHITE_SPACE;
        }

        tableOfMatrixValues += NEW_LINE;

        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                if (columnIndex === 0)
                    tableOfMatrixValues += rowIndex + WHITE_SPACE;
                if (column > 9)
                    tableOfMatrixValues += column + WHITE_SPACE;
                else
                    tableOfMatrixValues += WHITE_SPACE + column + WHITE_SPACE;
            });
            tableOfMatrixValues += NEW_LINE;
        });
    }

    formTableWithMatrixValuesWithIndexes(matrix, tableOfMatrixValues);
    console.log('5 UZD. Randomized matrix: ');
    console.log(tableOfMatrixValues);

    /* 6 UZD ------------------------------------------------------------- */

    let averageValuesOfRows = new Array(NAME_LENGTH);
    let averageValuesOfColumns = new Array(SURNAME_LENGTH);

    let sumValueOfMatrixEachEntryLine = 0;

    function calculateAverageValueForEachRow(matrix) {
        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                sumValueOfMatrixEachEntryLine += matrix[rowIndex][columnIndex];
            });
            averageValuesOfRows[rowIndex] = sumValueOfMatrixEachEntryLine / SURNAME_LENGTH;
            sumValueOfMatrixEachEntryLine = 0;
        });
    }

    function calculateAverageValueForEachColumn(matrix) {
        for (let iterator = 0; iterator < SURNAME_LENGTH; iterator++) {
            matrix.forEach(function (row, rowIndex) {
                sumValueOfMatrixEachEntryLine += matrix[rowIndex][iterator];
            });
            averageValuesOfColumns[iterator] = sumValueOfMatrixEachEntryLine / NAME_LENGTH;
            sumValueOfMatrixEachEntryLine = 0;
        }
    }

    function printEachArrayElement(averageValues) {
        let output = '';
        averageValues.forEach((value, index) => {
            output += value + WHITE_SPACE;
        });
        console.log(output);
    }

    calculateAverageValueForEachRow(matrix);
    calculateAverageValueForEachColumn(matrix);

    console.log('6 UZD. Each row averages: ');
    printEachArrayElement(averageValuesOfRows);

    console.log('6 UZD. Each column averages: ');
    printEachArrayElement(averageValuesOfColumns);

    /* 7 UZD ------------------------------------------------------------- */

    function countNumbersInRowsThatAreLargerThanRowAverage() {
        let counter = 0;
        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                if (matrix[rowIndex][columnIndex] > averageValuesOfRows[rowIndex])
                    counter++;
            });
            console.log('On ' + rowIndex + ' row: ' + counter);
            counter = 0;
        });
    }

    console.log('7 UZD. Rows that have their values larger than their average: ');
    countNumbersInRowsThatAreLargerThanRowAverage();

    /* 8 UZD ------------------------------------------------------------- */

    function getMaxValue(matrix) {
        let maxValue = 0;
        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
				// taisyta eilute
                if (rowIndex !== OCCURENCE_OF_CHAR_A && columnIndex !== OCCURENCE_OF_CHAR_A) {
                    if (maxValue < matrix[rowIndex][columnIndex]) {
                        maxValue = matrix[rowIndex][columnIndex];
                    }
                }
            });
        });
        return maxValue;
    }

    let maxValue = getMaxValue(matrix);
    console.log('8 UZD. Max value of the matrix: ' + maxValue);
 
    /* 9 UZD ------------------------------------------------------------- */

    let ascendingBubbleSort = (inputArray) => {
        for (let iterator = 0; iterator < SURNAME_LENGTH; iterator++) {
            for (let jterator = 0; jterator < SURNAME_LENGTH; jterator++) {
                if (inputArray[jterator] > inputArray[jterator + 1]) {
                    let temporaryValue = inputArray[jterator];
                    inputArray[jterator] = inputArray[jterator + 1];
                    inputArray[jterator + 1] = temporaryValue;
                }
            }
        }
        return inputArray;
    };

    let sortedNthMatrixRowAscendingOrder = ascendingBubbleSort(matrix[OCCURENCE_OF_CHAR_A].slice(0));

    console.log('9 UZD. Sorted matrix ' + OCCURENCE_OF_CHAR_A + 'th row (ascending order): ');
    printEachArrayElement(sortedNthMatrixRowAscendingOrder);

    /* 10 UZD ------------------------------------------------------------- */

    let nthColumnOfMatrix = [];

    function getNthColumnValues(matrix) {
        matrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                if (columnIndex === OCCURENCE_OF_CHAR_A) {
                    nthColumnOfMatrix.push(matrix[rowIndex][columnIndex]);
                }
            });
        });
    }

    let descendingBubbleSort = (inputArray) => {
        for (let iterator = 0; iterator < NAME_LENGTH; iterator++) {
            for (let jterator = 0; jterator < NAME_LENGTH; jterator++) {
                if (inputArray[jterator] < inputArray[jterator + 1]) {
                    let temporaryValue = inputArray[jterator];
                    inputArray[jterator] = inputArray[jterator + 1];
                    inputArray[jterator + 1] = temporaryValue;
                }
            }
        }
        return inputArray;
    };

    getNthColumnValues(matrix)
    let sortedNthMatrixColumnDescendingOrder = descendingBubbleSort(nthColumnOfMatrix.slice(0));

    console.log('10 UZD. Sorted matrix ' + OCCURENCE_OF_CHAR_A + 'th column (descending order): ');
    printEachArrayElement(sortedNthMatrixColumnDescendingOrder);

    /* 11 UZD ------------------------------------------------------------- */

    let { minValue, indexOfMinValue } = findMinValueAndIndex(averageValuesOfColumns);

    function findMinValueAndIndex(array) {
        let minValue = Infinity;
        let indexOfMinValue;
        array.forEach(value => {
            if (value < minValue)
                minValue = value;
        });
        indexOfMinValue = array.indexOf(minValue);
        return { minValue, indexOfMinValue };
    }

    console.log('11 UZD. The MIN value of column averages array is: ' + minValue + '. Index of value is: ' + indexOfMinValue);

    };
}

// visas main metodas yra paleidziamas per sukurta klases objekta
let laboratorinisVienas = new LaboratorinisVienas();
laboratorinisVienas.main();