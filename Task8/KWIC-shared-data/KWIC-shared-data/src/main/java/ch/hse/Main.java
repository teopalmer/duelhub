package ch.hse;

import ch.hse.modules.Alphabetizer;
import ch.hse.modules.CircularShift;
import ch.hse.modules.Input;
import ch.hse.modules.Output;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        System.out.println("Original: ");
        var input = List.of(
                "When you've seen beyond yourself then you may find",
                "Peace of mind is waiting there",
                "And the time will come when you see we're all one",
                "And life flows on within you and without you"
                );

        for (var line:
             input) {
            System.out.println(line);
        }

        Input.fillInputLines(input);
        CircularShift.shiftAllLines();
        Alphabetizer.sortAllLines();

        System.out.println("\nKWIC result: ");
        Output.printAllKWICLines();
    }
}