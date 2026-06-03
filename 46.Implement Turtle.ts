type Direction = "N" | "E" | "S" | "W";

type TurtlePosition = Readonly<{
  x: number;
  y: number;
}>;

/**
 * Maps a direction to its movement vector.
 */
const MOVEMENT: Record<Direction, TurtlePosition> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
} as const;

/**
 * Direction lookup tables.
 * Avoids large switch statements.
 */
const LEFT_TURN: Record<Direction, Direction> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
} as const;

const RIGHT_TURN: Record<Direction, Direction> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
} as const;

export default class Turtle {
  private currentDirection: Direction = "N";

  private currentPosition: TurtlePosition = {
    x: 0,
    y: 0,
  };

  /**
   * Calculates the next position based on
   * current direction and distance.
   */
  private calculateNewPosition(distance: number): TurtlePosition {
    const movement = MOVEMENT[this.currentDirection];

    return {
      x: this.currentPosition.x + movement.x * distance,
      y: this.currentPosition.y + movement.y * distance,
    };
  }

  /**
   * Move forward.
   */
  forward(distance: number): Turtle {
    this.currentPosition = this.calculateNewPosition(distance);
    return this;
  }

  /**
   * Move backward.
   */
  backward(distance: number): Turtle {
    this.currentPosition = this.calculateNewPosition(-distance);
    return this;
  }

  /**
   * Turn 90° left.
   */
  left(): Turtle {
    this.currentDirection = LEFT_TURN[this.currentDirection];
    return this;
  }

  /**
   * Turn 90° right.
   */
  right(): Turtle {
    this.currentDirection = RIGHT_TURN[this.currentDirection];
    return this;
  }

  /**
   * Returns [x, y].
   */
  position(): [number, number] {
    const { x, y } = this.currentPosition;
    return [x, y];
  }
}
