--- Part Three ---

The planned course seems reasonable, but as you look out the observation window of your submarine, you're filled with a sense of unease. The water in this area is murky and dark. If you hope to understand your surroundings, you're going to need some technological assistance.

You walk over to the submarine's scanner console and turn it on. It begins to boot up, but after a few seconds of waiting, the fans begin to spin wildly. You hear a loud popping sound, and the smell of burnt transistor fills the submarine.

Lucky for you, there's a data file on the ship computer, which contains the results of a previous scan of the area. The file contains scanner results for a large area around your position in the ocean. You'll need to reconstruct a map of your surroundings from this data to get your bearings.

The scan data file contains a blob of JSON data. Each entry in the JSON data represents a scan from a position in this part of the ocean. The keys for each entry are coordinates representing your horizontal position and your depth (which you can think of as an X,Y coordinate). The value for each key is a list containing 9 values, which represent a 3x3 area of the map centered on that position.

As an example, let's say your submarine is at horizontal position 1 (X = 1) and depth 1 (Y = 1). Querying your scanner data from position `(1,1)` might return the following:

```
["A", "B", "C", "D", "E", "F", "G", "H", "I"]
```

Then the map around your position would look like this:
```
ABC
DEF
GHI
```

The top left corner is coordinate (0,0). Your submarine, again, is at position `(1,1)` - the spot containing the `E`.

If you proceed to a new point (4,1), the scanner returns some new data:

```
["Z", "Y", "X", "W", "V", "U", "T", "S", "R"]
```

Using this data to extend your map, you would see the following:
```
ABCZYX
DEFWVU
GHITSR
```

Note that the scan data is returned in row order - i.e. each row of 3 cells in the scan is returned in order from top to bottom.

Additionally, there's a note in the manual about "sonar interference." Apparently, scanning locations that are too close together can cause the scanner to get confused and return junk data. In order to avoid having your data ruined by interference, **you must scan only the locations your submarine visits as it travels the course from your input**.

**Your goal is to build a map of the area by running the instructions in your input file and querying the scanner data as you go.** You'll need to keep track of the data from each location that you visit, and, once your sub has run through the full list of instructions, use the information you've gathered to generate a complete map of your surroundings.

Once you've constructed the map, you'll need to **print it so that we can take a look**. You won't receive data for every possible point. If you don't have a value for some location, you can assume it's empty (and just print a blank space). You're not quite sure of the exact size of the area you're traversing - you'll need to calculate the dimensions of the map to print it properly.

Good luck!