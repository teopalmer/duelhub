package ch.hse.modules;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Module responsible for all the shiftings of words in strings
 * Accesses the Core – shared data storage
 */
public class CircularShift {
    public static void shiftAllLines() {
        var input = Core.getInput();

        for (var lineOfWords:
             input) {
            List<String> tmp = new ArrayList<>(lineOfWords);
            Core.addShiftedLine(lineOfWords);
            // Shift words
            for (int i = 0; i < tmp.size()-1; i++) {
                tmp.add( tmp.remove(0));
                var val = new ArrayList<String>(tmp);
                Core.addShiftedLine(val);
            }
        }
    }
}
