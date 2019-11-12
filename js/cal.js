window.onload = function(){
	const inputCal = new cal
	const inputNumBox = document.querySelector('.inputNum')
	const historyNum = document.querySelector('.historyNum')
	let check = false;
	
	function cal(){}
	
	// 키입력 체크
	function finishCheck(){
		if(check == true){
			inputNumBox.value = 0
			check = false
		}
	}

	// 숫자 입력 함수
	const inputNum = cal.prototype.inputNum = function(n){
		let num = document.querySelectorAll('.box_25 li .num')
		
		function numBox(i){
			finishCheck()
			if(inputNumBox.value.replace(/,/g, '').length < 16){
				inputNumBox.value = inputNumBox.value.replace(/,/g, '') + num[i].innerText
				inputNumBox.value = Number(inputNumBox.value).toLocaleString();
			}
		}
		
		for(let i = 0; i < num.length; i++){
			num[i].addEventListener('click', function(e){
				e.preventDefault()
				finishCheck()
				numBox(i)
			})
		}
		numBox(n)
	}
	
	// 기능 버튼들
	cal.prototype.calBtn = function(){
		let btnNowReset = document.querySelector('.resetBox .btnNowReset')
		let btnReset = document.querySelector('.resetBox .btnReset')
		let btnDel = document.querySelector('.resetBox .btnDel')
		// 기록 미구현
		let btnHistory = document.querySelector('.resetBox .btnHistory')
		let plus = document.querySelector('.plus')
		let minus = document.querySelector('.minus')
		let multi = document.querySelector('.multi')
		let division = document.querySelector('.division')
		let btnsum = document.querySelector('.sumWrap .sum')
		let negative = document.querySelector('.negative')
		let integer = document.querySelector('.integer')
		
		// 백스페이스
		function _btnDel(){
			inputNumBox.value = inputNumBox.value.slice(0, -1)
			inputNumBox.value = Number(inputNumBox.value.replace(/,/g, '')).toLocaleString();
		}
		// CE = delete
		function _btnNowReset(){
			inputNumBox.value = null
			inputNumBox.value = 0
		}
		// +
		function _plus(){
			historyNum.innerText += inputNumBox.value.replace(/,/g, '') + '+'
			inputNumBox.value = 0
		}
		// -
		function _minus(){
			historyNum.innerText += inputNumBox.value.replace(/,/g, '') + '-'
			inputNumBox.value = 0
		}
		// *
		function _multi(){
			if(event.keyCode == 56 && event.shiftKey){
				if(inputNumBox.value !== '8'){
					historyNum.innerText += inputNumBox.value.replace(/,/g, '').slice(0, -1) + '*' // 8이 같이 눌리는걸 제거
					inputNumBox.value = 0
				}
			}
		}
		// /
		function _division(){
			historyNum.innerText += inputNumBox.value.replace(/,/g, '') + '/'
			inputNumBox.value = 0
		}
		// =
		function _btnsum(){
			inputNumBox.value = eval(historyNum.innerText + inputNumBox.value.replace(/,/g, '')).toLocaleString()
			historyNum.innerText = null
			finishCheck()
			check = true;
		}
		// 양수, 음수
		function _negative(){
			if(Number(inputNumBox.value) > 0){
				inputNumBox.value = inputNumBox.value * (-1)
			}else{
				inputNumBox.value = Math.abs(Number(inputNumBox.value))
			}
		}
		// .소수점 추가
		function _integer(){
			if(inputNumBox.value.indexOf('.') === -1){
				inputNumBox.value += '.'
			}
		}

		btnNowReset.addEventListener('click', function(e){
			e.preventDefault()
			_btnNowReset()
		})
		btnReset.addEventListener('click', function(e){
			e.preventDefault()
			inputNumBox.value = null
			historyNum.textContent = null
			inputNumBox.value = 0
		})
		btnDel.addEventListener('click', function(e){
			e.preventDefault()
			_btnDel()
		})
		plus.addEventListener('click', function(e){
			e.preventDefault()
			_plus()
		})
		minus.addEventListener('click', function(e){
			e.preventDefault()
			_minus()
		})
		multi.addEventListener('click', function(e){
			e.preventDefault()
			historyNum.innerText += inputNumBox.value.replace(/,/g, '') + '*'
			inputNumBox.value = 0
		})
		division.addEventListener('click', function(e){
			e.preventDefault()
			_division()
		})
		btnsum.addEventListener('click', function(e){
			e.preventDefault()
			_btnsum()
		})
		negative.addEventListener('click', function(e){
			e.preventDefault()
			_negative()
		})
		integer.addEventListener('click', function(e){
			e.preventDefault()
			_integer()
		})
		
		document.addEventListener('keydown', function(e){
			e.preventDefault() // 기본 기능 막혀서 안돼... 고쳐줘..
			// 숫자 입력 0 ~ 9
			switch(event.keyCode){
				case 48 : 
					inputNum(9)
					break
				case 49 :
					inputNum(6)
					break
				case 50 :
					inputNum(7)
					break
				case 51 :
					inputNum(8)
					break
				case 52 :
					inputNum(3)
					break
				case 53 :
					inputNum(4)
					break
				case 54 :
					inputNum(5)
					break
				case 55 :
					inputNum(0)
					break
				case 56 :
					inputNum(1)
					break
				case 57 :
					inputNum(2)
					break
			}

			// 키입력 + 사칙연산
			switch(event.keyCode){
				// +
				case 187 :
					_plus()
					break
				// -
				case 189 :
					_minus()
					break
				// *
				case 56 :
					_multi()
					break
				// /
				case 191 :
					_division()
					break
				// =
				case 13 :
					_btnsum()
					break
				// CE = delete
				case 46 :
					_btnNowReset()
					break
				// 백스페이스
				case 8 :
					_btnDel()
					break
				// .소수점 추가
				case 190 :
					_integer()
					break
			}
		})
	}
	inputCal.calBtn()
	inputNum(9)
}


/* 
----------수정 해야할점-------------
1. 기록 기능 미구현
2. . 소수점 추가시 3자리 까지만 되고 이상하게 작동함
3. 키보드와 마우스 입력 번갈아가면서 사용하다 보면 스크립트 29라인 for문이 다중 클릭됨
4. 텐키 부분 키입력 빠짐
5. document.keydown 부분에 이벤트 취소 시키는 구문을 넣어서 기본기능이 동작하지 않음(새로고침 등)
 */