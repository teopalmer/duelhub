package ch.hse.modules;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Class responsible for data input into the shared storage.
 * Accesses the Core – shared data storage
 */
public class Input {

    public static void fillInputLines(List<String> lines) {
        for (var line:
             lines) {
            Core.addInputLines(line.split(" "));
        }
    }
}
