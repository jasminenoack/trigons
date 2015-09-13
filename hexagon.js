var hexagon = window.hexagon = function () {
}

function isOdd (num) { return num % 2 }

hexagon.prototype.create = function (side_length) {
	this.side_length = side_length
	this.triangles = []
	for(var i = 0; i < side_length * 2; i++) {
		var tri_count
		this.triangles.push([])
		
		// determine the length of a triangle's side
		if (i === 0 || i === side_length) {
			tri_count = tri_count || side_length * 2 + 1
		} else if (i < side_length) {
			tri_count += 2
		} else {
			tri_count -= 2
		}

		for(var k = 0; k < tri_count; k++) {

			// set which triangles are upsidedown
			if (i < side_length && isOdd(k)) {
				this.triangles[i].push(new triangle([i, k], true))
			} else if ( i >= side_length && !isOdd(k)) {
				this.triangles[i].push(new triangle([i, k], true))
			} else {
				this.triangles[i].push(new triangle([i, k]))
			}
			
		}
	}
	this.associate_triangles()
	return this
}

hexagon.prototype.associate_triangles = function () {
	for (var i = 0; i < this.triangles.length; i++){ 
		for (var k = 0; k < this.triangles[i].length; k++) {
			this.triangles[i][k].associate_triangle(this.triangles)
		}		
	}
}

hexagon.prototype.last_row =  function () { return this.triangles[this.triangles.length - 1]}
hexagon.prototype.first_row = function () { return this.triangles[0]}
hexagon.prototype.height = function() { return this.triangles.length }
hexagon.prototype.row = function(row) { return this.triangles[row] }

var triangle = function (location, upsidedown) {
	this.upsidedown = upsidedown
	this.location = location
	this.sides = {}
}

triangle.prototype.associate_triangle = function (other_triangles) {
	// create shared sides
	row = other_triangles[this.location[0]]
	var location = this.location

	// find the triangle below
	if (!this.upsidedown) {
		var next_row = location[0] + 1 !== other_triangles.length ? other_triangles[location[0] + 1] : undefined
		if (!next_row) {
			lower_triangle = undefined
		} else if (next_row.length < row.length) {
			lower_triangle = next_row[location[1] - 1]
		} else if (next_row.length > row.length) {
			lower_triangle = next_row[location[1] + 1]
		} else if (next_row.length === row.length) {
			lower_triangle = next_row[location[1]]
		}
		if(lower_triangle) {
			var side = new shared_side([this, lower_triangle])
			this.sides.bottom = side
			lower_triangle.sides.top= side
		}
	}
	right_triangle = location[1] + 1 !== row.length ? row[this.location[1] + 1] : undefined

	if (right_triangle) {
		var side = new shared_side([this, right_triangle])
		this.sides.right = side
		right_triangle.sides.left = side
	}
}

var shared_side = function (triangles, value) {
	this.value = value;
	this.triangles = triangles || []
}