package org.example;

import java.util.*;

/**
 * Класс реализует алгоритм для решения задачи 8 королев.
 * Метод для вывода каждого очередного результата реагирует на событие нахождения результата.
 */

public class Q8Algo {
    private HashSet<Integer> columnPos = new HashSet<>();
    private HashSet<Integer> positiveDiagonalPos = new HashSet<>();
    private HashSet<Integer> negativeDiagonalPos = new HashSet<>();

    public Optional<Main> ref;

    private List<List<String[]>> result = new ArrayList<>();
    private List<String[]> chessBoard = List.of(
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"},
            new String[]{"*", "*", "*", "*", "*", "*", "*", "*"}
    );


    public void backtrackAlgo(int currentRow) {
        if (currentRow == 8) {
            result.add(List.copyOf(chessBoard));
            printBoard();
            return;
        }

        for (int i = 0; i < 8; i++) {
            if (!(columnPos.contains(i) || positiveDiagonalPos.contains(i + currentRow) ||
                    negativeDiagonalPos.contains(currentRow - i))) {
                columnPos.add(i);
                positiveDiagonalPos.add(i+currentRow);
                negativeDiagonalPos.add(currentRow-i);
                var tmp = chessBoard.get(currentRow);
                tmp[i] = "Q";

                backtrackAlgo(currentRow + 1);

                columnPos.remove(i);
                positiveDiagonalPos.remove(i+currentRow);
                negativeDiagonalPos.remove(currentRow-i);
                tmp = chessBoard.get(currentRow);
                tmp[i] = "*";
            }
        }
    }

    public void printBoard() {
        for (var res:
                result) {
            for (var line:
                    res) {
                for (var item:
                        line) {
                    System.out.print(item + " ");
                }
                System.out.println();
            }
            System.out.println();
        }

    }
}
