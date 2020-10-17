let storage = localStorage.getItem('tasklist');

let tasks = [];
let donecount = localStorage.getItem('donecount');
let taskleft=5-Number(donecount)


if (donecount != null) {
	createdonetaskbutton();
	document.querySelector('h1').style.transform='translateX(-150px)'
	lefttaskcountdom()
}
else {
	document.querySelector('.addtask').addEventListener('click', addtask);
	document.querySelector('.deltask').addEventListener('click', deltask);


}

if (storage != null) {
	tasks = JSON.parse(storage);
	tasks.forEach(function (n) {
		let lis = document.createElement('li');
		lis.textContent = n;
		document.querySelector('ul').appendChild(lis);
	});
}


function addtask(e) {
	let taskval = document.querySelector('input').value;
	if (donecount == null) {
		if (taskval.length < 30) {
			if (taskval.length > 0) {
				let newli = document.createElement('li');

				newli.textContent = taskval;

				document.querySelector('ul').appendChild(newli);

				tasks.push(taskval);
				document.querySelector('input').value = '';
				localStorage.setItem('tasklist', JSON.stringify(tasks));
			}
		} else {
			alert('Your task must contain less than 30 letters');
		}
	}
	if (tasks.length >= 5) {
		createdonetaskbutton();
		localStorage.setItem('donecount', JSON.stringify(0));
	}
	e.preventDefault();
}


function deltask(e) {
	document.querySelector('ul').lastElementChild.remove();
	tasks.pop();
	localStorage.setItem('tasklist', JSON.stringify(tasks));
}

function createdonetaskbutton() {
	document.querySelector('input').remove();
	document.querySelector('.addtask').remove();
	document.querySelector('.deltask').remove();
	let done = document.createElement('button');
	done.className = 'done';
	done.textContent = 'Done';
	document.querySelector('.mainarea').appendChild(done);
	document.querySelector('.done').addEventListener('click', donetask);
	document.querySelector('h1').style.transform='translateX(-150px)'
	lefttaskcountdom()

}

function donetask(e) {
	document.querySelector('ul').firstElementChild.remove();
	tasks.shift();
	localStorage.setItem('tasklist', JSON.stringify(tasks));
	if (donecount != null) {
		let donetaskcount = JSON.parse(donecount);
		donetaskcount += 1;
		localStorage.setItem('donecount', JSON.stringify(donetaskcount));
	} else {
		localStorage.setItem('donecount', JSON.stringify(5));
	}
	if (tasks <= 5) {
		document.querySelector('.done').remove();
		localStorage.clear();
		window.location.href = 'congratulation.html'

	}
	taskleft-=1
	lefttaskcountdom()

	e.preventDefault()
}



function lefttaskcountdom() {
	if (taskleft>1) {
	document.querySelector('p').textContent=`You have ${taskleft} tasks left`


	}
	else {
	document.querySelector('p').textContent='Just one more task!'


	}
}