(function(){
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    let eventsWrapper = document.getElementById('events-wrapper');
    let events = document.getElementById('events');
    let fillingLine = document.getElementById('filling-line');
    let dateNodes = events.getElementsByClassName('date');
    let dates = [];
    let oldChosenNode;
    let timelineWidth;
    
    const PER_DISTANCE = 60;
    

    // [10, 30, 40, 70]

    // A--B-C---D

    Array.prototype.forEach.call(dateNodes, (dateNode) => { 
        let dateStr = dateNode.dataset.date;
        dates.push(datify(dateStr));
    });

    let minLapse = calMinLapse();
    setDatePostion();
    setTimeline();

    function setDatePostion() {
        for(let i = 0; i < dates.length; i++) {
            let diff = timeDiff(dates[i], dates[0]);
            let ratio = diff / minLapse + 1;
            let left = ratio * PER_DISTANCE;
            dateNodes[i].style.left = `${left}px`;
        }
    }

    function setTimeline() {
        let diff = timeDiff(dates[dates.length - 1], dates[0]);
        let ratio = diff / minLapse + 2;
        timelineWidth = ratio * PER_DISTANCE;
        events.style.width = fillingLine.style.width = `${timelineWidth}px`;
        oldChosenNode = dateNodes[0];
        fill(oldChosenNode);
    }


    function fill(chosenNode) {
        let left = chosenNode.style.left;
        let halfWidth = parseFloat(getStyle(chosenNode, 'width')) / 2;
        let ratio = (parseFloat(left) +  halfWidth)/ timelineWidth;
        fillingLine.style.transform = `scaleX(${ratio})`;
    }

    function datify(dateStr) {
        let [year, month, date] = (dateStr || '').split('/');
        return new Date(year, month - 1, date);
    }

    function timeDiff(date1, date2) {
        return date1.getTime() - date2.getTime();
    }

    function getStyle(node, property) {
        let styleObj = window.getComputedStyle(node);
        return styleObj[property];
    }


    function calMinLapse() {
        // dates
        if(dates.length === 1) {
            return dates[0];
        }
        let min = dates[1] - dates[0];
        for(let i = 2; i < dates.length; i++) {
            let diff = dates[i] - dates[i - 1];
            if(diff < min) {
                min = diff;
            }
        }
        return min;
    }

    events.addEventListener('click', (evt) => {
        let target = evt.target;
        if(oldChosenNode === target) {
            return;
        }
        oldChosenNode.classList.remove('chosen');
        target.classList.add('chosen');
        oldChosenNode = target;

        let matchedIndex = Array.prototype.indexOf.call(dateNodes, target);

        Array.prototype.forEach.call(dateNodes, (dateNode, index) => {
            let classList = dateNode.classList;
            if(index < matchedIndex) {
                if(!classList.contains('previous')) {
                    classList.add('previous');
                }
            } else {
                classList.remove('previous');
            }
        });

        fill(target);
    });

    prev.addEventListener('click', () => {
        navigate('prev');
    });

    next.addEventListener('click', () => {
        navigate('next');
    });

    function navigate(direction) {
        let transStyle = getStyle(events, 'transform');
        // "matrix(1, 0, 0, 1, -500, 0)"
        let transX = parseFloat(transStyle.split('(')[1].split(')')[0].split(',')[4]);
        let eventWrapperWidth = parseFloat(getStyle(eventsWrapper, 'width'));
        let translateX;

        if(direction === 'next') {
            translateX = transX - eventWrapperWidth;
        } else {
            translateX = transX + eventWrapperWidth;
        }

        if(translateX > 0) {
            translateX = 0;
        }

        if(translateX < (eventWrapperWidth - timelineWidth)) {
            translateX = eventWrapperWidth - timelineWidth;
        }
        events.style.transform = `translateX(${translateX}px)`;
    }
})();