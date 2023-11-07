package ch.hse.modules;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Class for data sharing between modules
 */

public class Core {
    private static List<List<String>> inputLines = new ArrayList<>();

    private static List<List<String>> allShiftedLines = new ArrayList<>();
    private static List<String> alphabetizedLines = new ArrayList<>();

    public static List<List<String>> getInput() {
        return  inputLines;
    }

    public static List<List<String>> getAllShiftedLines() {
        return  allShiftedLines;
    }

    public static List<String> getAlphabetized() {
        return alphabetizedLines;
    }

    public static void addInputLines(String[] line) {
        inputLines.add(Arrays.stream(line).toList());
    }

    public static void addShiftedLine(List<String> line){
        allShiftedLines.add(line);
    }

    public static void addToAlphabetized(List<String> lines){
        alphabetizedLines = lines;
    }
}
