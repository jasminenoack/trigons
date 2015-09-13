var create_options_table = function (nums) {
	nums = nums || 7
	var options = [[]]
	for (var i = 0; i < nums; i ++) {
		var current_options = []
		for (var k = 0; k < options.length; k ++) {
			var option = options[k]
			if (option.length === 2) {
				current_options.push(option.concat([i]))
			} else if (option.length === 1) {
				current_options.push(option.concat([i]))
				current_options.push(option.concat([i, i]))
			} else if (option.length === 0) {
				current_options.push(option.concat([i]))
				current_options.push(option.concat([i, i]))
				current_options.push(option.concat([i, i, i]))
			}
		}
		options = options.concat(current_options)
		
	}

	puzzle_options = {}
	for (var i = 0; i < options.length; i++) {
		var option = options[i]
		if (option.length === 3) {
			var total = option.reduce(function(a, b) {
  				return a + b;
			})
			if (puzzle_options[total]) {
				puzzle_options[total].push(option)
			} else {
				puzzle_options[total] = [option]
			}

		}
	}
	return puzzle_options
}

window.puzzle_options = create_options_table()

window.build_options_table = function () {
	var $total_temp = $('<ul class="total"></ul>')
	var $option_temp = $('<li class="option active"></li>')
	var $option_total_temp = $('<li class="option-total option active"></li>')
	var $options = $(".options")
	var next = 0

	while(next || next === 0) {
		options = puzzle_options[next]
		$current_total = $total_temp.clone()

		for (var i = 0; i < options.length; i++) {
			$current_total.append($option_temp.clone().text(options[i].join("")))
			$options.append($current_total)
		}
		$current_total.append($option_total_temp.clone().text(next))

		next = puzzle_options[next + 1] ? next + 1 : null
	}
}

window.build_puzzle_board = function () {
	$triangle = $('<div class="triangle"><p>1</p><ul class="sides"><li class="side"></li><li class="side"></li><li class="side"></li></ul></div>')
	$board = $(".board")
	var hex = new window.hexagon
	hex.create(4)
	var y = 0
	for (var i = 0; i < hex.height(); i++) {
		var offset
		if (i < 3) {
			offset = 3 - i
		} else if ( i > 4) {
			offset = i - 4
		} else {
			offset = 0
		}
		var x = 0
		y += i === 0 ? 0 : 3.464
		var row = hex.triangles[i]
		for (var j = 0; j < row.length; j++) {
			x += j === 0 ? 0 : 2
			$new_tri = $triangle.clone()
			$new_tri.css("left", "" + (x + offset * 2)+ "em")
			$new_tri.css("top", "" + y + "em")
			$board.append($new_tri)

			if ((j % 2 !== 0 && i < 4) || (j % 2 === 0 && i >= 4)) {
				$new_tri.addClass("upsidedown")
			}


		}
	}

}
