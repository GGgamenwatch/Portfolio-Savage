window.onload = function(){

    const data = [
        {
            id:0,
            img:'es-fsport-card1.jpg',
            title:'2020 Lexus ES 350 F Sport',
            msrp:'$50,000',
            ptext1:'Engine: 3.5L V6',
            ptext2:'Transmission: 10 Speed Auto',
            ptext3:'Stock#: 10101',
            ptext4:'Color: Ultrasonic Blue Mica',
            ptext5:'Drivetrain: FWD',
            display: 'inline',
            make: 'es-f-sport',
        },
        {
            id:1,
            img:'es-350-card-white.jpg',
            title:'2020 ES 350',
            msrp:'$43,789',
            ptext1:'Engine: 3.5L V6',
            ptext2:'Transmission: 10 Speed Auto',
            ptext3:'Stock#: 10102',
            ptext4:'Color: Eminent White Pearl',
            ptext5:'Drivetrain: FWD',
            display: 'inline',
            make:'unknown',
        },
        {
            id:2,
            img:'es-card-luxury.webp',
            title:'2020 ES 350 Luxury',
            msrp:'$51,223',
            ptext1:'Engine: 3.5L V6',
            ptext2:'Transmission: 10 Speed Auto',
            ptext3:'Stock#: 10103',
            ptext4:'Color: Nebula Grey Pearl',
            ptext5:'Drivetrain: FWD', 
            display: 'inline',
            make:'unknown'
        },
        {
            id:3,
            img:'es-hybrid-card.jpg',
            title:'2020 ES 300 Hybrid',
            msrp:'$46,950',
            ptext1:'Engine: 2.5L 4L',
            ptext2:'Transmission: CVT',
            ptext3:'Stock#: 10104',
            ptext4:'Color: Silver Lining Metallic',
            ptext5:'Drivetrain: FWD',  
            display: 'inline',
            make:'unknown'
        }
    ];
    
    
    function makeCard(obj){
        //make elements
        const target = document.querySelector('#card-div');
        const enclosingDiv = document.createElement('div');
        const rowDiv = document.createElement('div');
        const imageDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const cardBody = document.createElement('div');
        const header1 = document.createElement('h5');
        const header2 = document.createElement('h5');
        const para1 = document.createElement('p');
        const img  =document.createElement('img');
        const para2 = document.createElement('p');
        const para3 = document.createElement('p');
        const para4 = document.createElement('p');
        //add classes
        enclosingDiv.className = `card mb-1 option-${obj.id}`;
        rowDiv.className = 'row';
        imageDiv.className = 'col-md-4';
        textDiv.className = 'col-md-8';
        cardBody.className = 'card-body';
        header1.className = 'card-title';
        para1.className = 'card-text';
        img.className = 'card-img';
        para2.className = 'card-text';
        para3.className = 'card-text';
        para4.className = 'card-text';
        //add data
        header1.innerText = obj.title;
        header2.innerText = obj.msrp;
        img.src=obj.img;
        para1.innerText = obj.ptext1;
        enclosingDiv.style.display = obj.display;
        enclosingDiv.id = obj.id;
        para2.innerText = obj.ptext2;
        para3.innerText = obj.ptext3;
        para4.innerText = obj.ptext4;
        //
        //add elements to DOM
        cardBody.appendChild(header1);
        cardBody.appendChild(header2);
        cardBody.appendChild(para1);
        textDiv.appendChild(cardBody);
        imageDiv.appendChild(img);
        rowDiv.appendChild(imageDiv);
        rowDiv.appendChild(textDiv);
        enclosingDiv.appendChild(rowDiv);
        target.appendChild(enclosingDiv);
        cardBody.appendChild(para2);
        cardBody.appendChild(para3);
        cardBody.appendChild(para4);
    
        return enclosingDiv
    }
    
    const divs = data.map(item=>makeCard(item));
    const inputs = Array.prototype.slice.call(document.body.querySelectorAll('select'));
    const filters = {
        'make': filterMake,
        'model': filterModel,
        'engine': filterEngine,
        'price': filterPrice,
    };
    const filterArray = [filterMake, filterModel, filterEngine, filterPrice];
    
    // console.log(inputs);
    
    // const values = inputs.map(input=>input.value)
    // console.log(values);
    
    
    
    const listeners = inputs.map(input=>input.addEventListener('change',(e)=>{
        hideDivs();
        const values = inputs.map(input=>input.value);
        const filterValues = values.map((item, i)=>filterArray[i](item))   
        const idArrays = findIds(filterValues);
        const intersectAll = (...xss)=> xss.reduce(intersection);
        const found = intersectAll(...idArrays);
        found.map(id=>divs[id].style.display='inline');
    }))
    
    function findIds(filterValues){
        console.log(filterValues)
        return filterValues.map(term=>term.map(item=>item.id));
            // .map(item=>item.id)
    //     .map(choice=>{divs[choice].style.display='inline'});
    }

    function intersection(xs, ys){
        return xs.filter(x => ys.indexOf(x) > -1);
    }


    function showAll(){
        divs.forEach(div=>{
            div.style.display = 'inline';
        })
    }
    
    
    function hideDivs(){
        divs.forEach(div=>{
            div.style.display = 'none';
        })
    }
  
    function filterMake(val){
        const found = val === 'all' ? data : data.filter(item => item.make === val)
        return found
    }
    
    function filterModel(val){
        const found = val === 'all' ? data : data.filter(item => item.model === val)
        return found
    }
    
    function filterEngine(val){
        const found = val === 'all' ? data : data.filter(item => item.engine === val)
        return found
    }
    
    function filterPrice(val){
        const found = val === 'all' ? data : data.filter(item => parseInt(item.msrp.substring(1)) > parseInt(val));
        return found
    }
    // .map(item=>item.id)
    // .map(choice=>{divs[choice].style.display='inline'}); 
    // function filterMake(val){
    //     const choice = data.filter(item => item.make === val)
    //     .map(item=>item.id)
    //     .map(choice=>{divs[choice].style.display='inline'});
    // }
    
    // function filterModel(val){
    //     const choice = data.filter(item => item.model === val)
    //     .map(item=>item.id)
    //     .map(choice=>{divs[choice].style.display='inline'});
    // }
    
    // function filterEngine(val){
    //     const choice = data.filter(item => item.engine === val)
    //     .map(item=>item.id)
    //     .map(choice=>{divs[choice].style.display='inline'});
    // }
    
    // function filterPrice(val){
    //     // console.log(val);
    
    //     const choice = data.filter(item => parseInt(item.msrp.substring(1)) > parseInt(val))
    //     .map(item=>item.id)
    //     .map(choice=>{divs[choice].style.display='inline'});
    // }
    
    
    
    
    };
    
    // const choice = data.filter(item => parseInt(item.msrp.substring(1)) > 50,000)
    //                 .map(item=>item.id)
    //                 .map(choice=>{divs[choice].style.display='inline'});