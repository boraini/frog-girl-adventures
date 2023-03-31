# Levels - Version 0

## Main Specification
```java
{
  "version": 0,
  "title": String, // Level title to be displayed on top left
  "description": String, // Level description to be displayed on top left
  "start": int[3], // Start position - always on solid ground
  "finish": int[3], // Finish position - always on solid ground
  "numberOfTransforms": int[3], // Maximum amount of transforms for 3 stars, 2 stars, and 1 star
  "ground": boolean[][], // For every true value a ground tile is placed
  "lilypads": Number[][2], // A lilypad is placed in every real number coordinate
  "lilypadPaths": Waypoint[][], // Each array of waypoints is connected as a chain
  "objects": Object[]
}
```

### "start" and "finish"
These are given as [x, ???, y] where the value of ??? doesn't matter, and x, y should correspond to a ground tile (`ground[x][y]` should be `true`).

This is so because I had plans to adding levels with multiple layers of floating rocks. However, I no longer plan to do it in the near future but still kept the feature to not deal with backward compatibility later. 

### Waypoints
Waypoints are given as either an integer of and array of two integers. When a single integer is specified the level populator will look for a lilypad by index to add a waypoint. If an array of two integers is provided the populator will look for a ground tile to add a waypoint. 

When designing levels do not forget to add the endpoints of lilypad pads which include at least one ground tile somewhere.

## Objects
An object has an id, a type, and an initial location and can
- be picked up
- be placed down
- trigger another object when picked up

To reflect these behavior, there are basic objects that represent them all. A key is intended to be used as a trigger and is destroyed immediately after picking up. A blocker can be picked up and placed down, and when it is down it won't allow anything to go over it, including boulders. A boulder cannot be picked up and it will block anything going over it, however it can be triggered so it rolls to a new prescribed location.

### Blocker
A blocker is the simplest and is given as
```java
{
  "id": int,
  "type": "blocker",
  "location": int[3]
}
```

"id" should be positive and unique to each object. "location" is given similarly to "start" and "finish" locations for the level.

### Key
Let's see how a key is specified.
```java
{
  "id": int,
  "type": "key",
  "location": int[3],
  "triggers": int
},
```

The extra "triggers" field can be added to any object that can be picked up (so keys and blockers by default) and will cause the object with the provided id to do its trigger action. For example it can cause a boulder to roll.

### Boulder
Boulder is arguably the most complex object to define.
```java
{
  "id": int,
  "type": "boulder",
  "location": int[3],
  "rollTo": int[3]
}
```

When triggered the boulder will roll to the "rollTo" location using form-agnostic pathfinding, that is, it can roll over anything, including lilypads, other than waypoints that have a blocker on them. If a path is found but there is a blocker on it, the path will be followed until the blocker. If the blocker is picked up again and the boulder is retriggered, it will continue following the path until encountering another blocker. The path may change if a shorter path becomes available.