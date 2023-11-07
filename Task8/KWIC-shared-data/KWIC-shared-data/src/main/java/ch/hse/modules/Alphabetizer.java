package ch.hse.modules;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Module responsible for sorting all strings in alphabet order.
 * Accesses the Core – shared data storage
 */
public class Alphabetizer {

    public static void sortAllLines() {
        var shifted = Core.getAllShiftedLines();
        List<String> lines = new ArrayList<>();

        for (var wordsInLine:
             shifted) {

            String line = String.join(" ", wordsInLine);
            lines.add(line);
        }
        Collections.sort(lines);
        Core.addToAlphabetized(lines);
    }
}
