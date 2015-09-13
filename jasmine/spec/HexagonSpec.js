describe("Hexagon", function() {
  var hex1;
  var hex2;
  var hex3;

  beforeEach(function() {
    hex1 = new hexagon
    hex1.create(1)
    hex2 = new hexagon
    hex2.create(2)
    hex3 = new hexagon
    hex3.create(3)
  });

  it("should have side_length * 2 rows", function() {
    expect(hex1.height()).toEqual(expected_side_length(hex1))
    expect(hex2.height()).toEqual(expected_side_length(hex2))
    expect(hex3.height()).toEqual(expected_side_length(hex3))
  });

  it("should have first and last sides with length side_length * 2 + 1", function () {
    expect(hex1.first_row().length).toEqual(expected_first_row_count(hex1))
    expect(hex2.first_row().length).toEqual(expected_first_row_count(hex2))
    expect(hex3.first_row().length).toEqual(expected_first_row_count(hex3))
    expect(hex1.last_row().length).toEqual(expected_first_row_count(hex1))
    expect(hex2.last_row().length).toEqual(expected_first_row_count(hex2))
    expect(hex3.last_row().length).toEqual(expected_first_row_count(hex3))
  });

  it("should have center rows that are the same length, of side_length * 2 + 1 + (side_length - 1) * 2", function () {
    expect(top_middle_row(hex1).length).toEqual(expected_middle_row_length(hex1))
    expect(bottom_middle_row(hex1).length).toEqual(expected_middle_row_length(hex1))
    expect(top_middle_row(hex2).length).toEqual(expected_middle_row_length(hex2))
    expect(bottom_middle_row(hex2).length).toEqual(expected_middle_row_length(hex2))
    expect(top_middle_row(hex3).length).toEqual(expected_middle_row_length(hex3))
    expect(bottom_middle_row(hex3).length).toEqual(expected_middle_row_length(hex3))
  });

  it("should associate triangles who are next to each other through their sides", function () {
    // check triangles in a row
    right_triangle = hex1.triangles[0][0]
    expect(undefined).toEqual(right_triangle.sides.left)
    left_triangle = hex1.triangles[0][0]
    right_triangle = hex1.triangles[0][1]
    expect(left_triangle.sides.right).toEqual(right_triangle.sides.left)
    left_triangle = hex1.triangles[0][1]
    right_triangle = hex1.triangles[0][2]
    expect(left_triangle.sides.right).toEqual(right_triangle.sides.left)
    left_triangle = hex1.triangles[0][2]
    expect(left_triangle.sides.right).toEqual(undefined)

    // check triangles stacked
    up_triangle = hex1.triangles[0][0]
    down_triangle = hex1.triangles[1][0]
    expect(up_triangle.sides.bottom).toEqual(down_triangle.sides.top)
    down_triangle = hex1.triangles[0][1]
    expect(undefined).toEqual(down_triangle.sides.bottom)
    up_triangle = hex1.triangles[0][2]
    down_triangle = hex1.triangles[1][2]
    expect(up_triangle.sides.bottom).toEqual(down_triangle.sides.top)
    up_triangle = hex1.triangles[1][1]
    expect(up_triangle.sides.bottom).toEqual(undefined)

    // checking nonequal rows
    // check triangles in a row
    left_triangle = hex2.triangles[2][2]
    right_triangle = hex2.triangles[2][3]
    expect(left_triangle.sides.right).toEqual(right_triangle.sides.left)
    left_triangle = hex2.triangles[3][3]
    right_triangle = hex2.triangles[3][4]
    expect(left_triangle.sides.right).toEqual(right_triangle.sides.left)

    // check triangles stacked
    up_triangle = hex2.triangles[0][0]
    down_triangle = hex2.triangles[1][1]
    expect(up_triangle.sides.bottom).toEqual(down_triangle.sides.top)
    up_triangle = hex2.triangles[1][2]
    down_triangle = hex2.triangles[2][2]
    expect(up_triangle.sides.bottom).toEqual(down_triangle.sides.top)
    up_triangle = hex2.triangles[2][1]
    down_triangle = hex2.triangles[3][0]
    expect(up_triangle.sides.bottom).toEqual(down_triangle.sides.top)
  });

});

function expected_side_length (hex) { return hex.side_length * 2 }
function expected_first_row_count (hex) { return hex.side_length * 2 + 1 }
function top_middle_row (hex) { return hex.row(hex.height() / 2 - 1) }
function bottom_middle_row (hex) { return hex.row(hex.height() / 2) }
function expected_middle_row_length (hex) {return hex.side_length * 2 + 1 + (hex.side_length - 1) * 2}
