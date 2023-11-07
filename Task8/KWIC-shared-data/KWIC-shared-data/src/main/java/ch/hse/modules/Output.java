package ch.hse.modules;


/**
 * Class responsible for returning the data output.
 * Accesses the Core – shared data storage
 */
public class Output {
    public static void printAllKWICLines() {
        var lines = Core.getAlphabetized();
        for (var line:
             lines) {
            System.out.println(line);
        }
    }
}
