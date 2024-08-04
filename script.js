//inputs
const cardName = document.getElementById('name');
const cardNumber = document.getElementById('number');
const month = document.getElementById('month');
const year = document.getElementById('year');
const cvc = document.getElementById('cvc');
const confirmBtn = document.getElementById('confirm');
//outputs
const numberOutput = document.querySelector('.card-number');
const nameOutput = document.querySelector('.card-name');
const monthOutput = document.querySelector('.card-month');
const yearOutput = document.querySelector('.card-year');
const cvcOutput = document.querySelector('.card-cvc');
//form
const cardForm = document.querySelector('.form-container form');
//funtion to format the number input

function attachEL (){
    //card number format and display
    cardNumber.addEventListener('input', e => {
        
         //no spaces and characters only numbers
        let value = e.target.value.replace(/\s+/g, '');
        value = e.target.value.replace(/[^0-9]/g, '');
        // Limit the input to 16 digits
        if (value.length > 16) {
          value = value.slice(0, 16);
        }
        // Format the value with spaces after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < value.length; i += 4) {
          if (i + 4 < value.length) {
            formattedValue += value.substr(i, 4) + ' ';
          } else {
            formattedValue += value.substr(i);
          }
        }
    
        const cursorPosition = e.target.selectionStart;
        e.target.value = formattedValue.trim();
        numberOutput.textContent = e.target.value;
    
        // Calculate the new cursor position
        let newCursorPosition = cursorPosition;
        if (formattedValue[cursorPosition - 1] === ' ') {
          newCursorPosition++;
        }
    
        // Set the new cursor position
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    //name display
    cardName.addEventListener('input',e => {
          nameOutput.textContent = e.target.value;
      });
    //month display
    month.addEventListener('input', e => {
        e.target.value= e.target.value.replace(/[^0-9]/g, '');
        monthOutput.textContent =e.target.value;
    }); 
    year.addEventListener('input', e => {
        e.target.value= e.target.value.replace(/[^0-9]/g, '');
        yearOutput.textContent = e.target.value;
    }) ;
    cvc.addEventListener('input' , e => {
        e.target.value= e.target.value.replace(/[^0-9]/g, '');
        cvcOutput.textContent = e.target.value;
    })
}
document.addEventListener('DOMContentLoaded' , () => {
    attachEL();
    cardForm.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;
        //name validate !empty
        if(!cardName.value){
            document.querySelector('.error-name').style.display = 'initial';
            isValid = false;
        }else{
            document.querySelector('.error-name').style.display = 'none';
            isValid = true;
        }
        //number validate !empty
        if(!cardNumber.value || cardNumber.value.length != 19){
            document.querySelector('.error-number').style.display = 'initial';
            isValid = false;
        }else{
            document.querySelector('.error-number').style.display = 'none';
            isValid = true;
        }//month validate !empty
        if(!month.value || !year.value){
            document.querySelector('.date .error').style.display = 'initial';
            isValid = false;
        }else if(parseInt(month.value) > 12 || parseInt(month.value) < 1){
            document.querySelector('.date .error').style.display = 'initial';
            document.querySelector('.date .error').textContent =  'Invalid Month';
            isValid = false;
        }
        else if(parseInt(year.value) < 24 || parseInt(year.value) > 50 ){
            document.querySelector('.date .error').style.display = 'initial';
            document.querySelector('.date .error').textContent =  'Invalid Year';
            isValid = false;
        }
        else{
            document.querySelector('.date .error').style.display = 'none';
            isValid = true;
        }//cvc validate !empty
        if(!cvc.value){
            document.querySelector('.cvc .error').style.display = 'initial';
            isValid = false;
        }else{
            document.querySelector('.cvc .error').style.display = 'none';
            isValid = true;
        }
        if(!isValid){
            return;
        }
        else{
            //display complete step 
            document.querySelector('.form-container').style.display = 'none';
            document.querySelector('.confirmation').style.display = 'flex';  
            document.querySelector('.confirmation .confirm').addEventListener('click' , ()=>{
                document.querySelector('.form-container').style.display = 'flex';
                document.querySelector('.confirmation').style.display = 'none';
                cardName.value ='';
                cardNumber.value ='';
                month.value ='';
                year.value ='';
                cvc.value ='';
            });  
        }
    });
    
});