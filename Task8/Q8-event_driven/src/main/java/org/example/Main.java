package org.example;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class Main {

    private boolean foundResult = false;
    static Q8Algo algo = new Q8Algo();
    public void raiseEvent() {
        foundResult = true;
        algo.printBoard();
    }

    public static void main(String[] args) {
        System.out.println("Hello world!");
        algo.backtrackAlgo(0);
    }
}