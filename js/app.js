//Variables
let choice_list = document.getElementById("choice"); //Choice of what to do
let currency_button = document.getElementById("get_cur"); //Choice of what to do
let countries_button = document.getElementById("get_cnt"); //Choice of what to do
let clean_countries  = document.getElementById("clean_cnt");
let clean_curr = document.getElementById("clean_crr");
let clean_conv = document.getElementById("clean_conv");
let convert =  document.getElementById("convert_button");
let swap_sym = document.getElementById("swap_sym");
let convert_name = document.getElementById("convert_button_name");
let clean_name = document.getElementById("clean_conv_name");
let swap_name = document.getElementById("swap_name");

//Function to get the input of the user
function get_choice(){

    //Get value
    let choice = document.getElementById("choice").value;

    //Search for symbols
    if(choice == "sym"){
        document.getElementById("sym_area").style.display = "block"; //Show Symbol search area
        document.getElementById("conv_area").style.display = "none";
        document.getElementById("cnt_area").style.display = "none";
        document.getElementById("areas").style.display = "none";
        document.getElementById("curr_name_area").style.display = "none";
        document.getElementById("results").style.display = "none";

        get_currency();
    }

    //Money conversion
    else if(choice == "conv"){
       document.getElementById("conv_area").style.display = "block" //Show Conversion search area
       document.getElementById("sym_area").style.display = "none"
       document.getElementById("cnt_area").style.display = "none";;
       document.getElementById("areas").style.display = "block"; //Show Conversion search area
       document.getElementById("curr_name_area").style.display = "none";
       document.getElementById("results").style.display = "none";

       clean_ctr();
    }

    //Show country area
    else if(choice == "ctr"){
        document.getElementById("sym_area").style.display = "none";
        document.getElementById("conv_area").style.display = "none";
        document.getElementById("cnt_area").style.display = "block"; //Show Country search area
        document.getElementById("areas").style.display = "none";
        document.getElementById("curr_name_area").style.display = "none";
        document.getElementById("results").style.display = "none";

        get_countries();
    }

    //Show default
    else if(choice == "def"){
        document.getElementById("sym_area").style.display = "none";
        document.getElementById("conv_area").style.display = "none";
        document.getElementById("curr_name_area").style.display = "none";
        document.getElementById("cnt_area").style.display = "none";
        document.getElementById("areas").style.display = "none";
        document.getElementById("results").style.display = "none";
    }

    else if(choice == "conv_name"){
        document.getElementById("conv_area").style.display = "none" //Show Conversion search area
        document.getElementById("curr_name_area").style.display = "block" //Show Conversion search area
        document.getElementById("sym_area").style.display = "none"
        document.getElementById("cnt_area").style.display = "none";
        document.getElementById("areas").style.display = "block"; //Show Conversion search area
        document.getElementById("results").style.display = "none";

        clean_ctr();

        conv_name();
    }
    
}


//Function to get the currency list available
async function get_currency(){

    clean_ctr();

    document.getElementById("result_country").style.display = "none"; //Get datalist area

    const list_currency = await fetch("https://free.currconv.com/api/v7/currencies?apiKey=255b739e9b5bb67c9f82");
    let data = await list_currency.json(); //Raw data country's info
    let currency = data.results; //Cleaned data
    let options = ''; //Variable to store the options
    let my_list = document.getElementById("curr"); //Get datalist area
    let my_list_result = document.getElementById("curr_input");
    let curr = [];

    //Get list
    for(const symbols of Object.keys(currency)){

        const currencies = currency[symbols]; //Only keys of the API data
        curr.push(currencies.currencyName);
        
    }   

    //Loop through countries container
    for(let i = 0; i < curr.length; ++i){
        options += '<option value="' + curr[i] + '" />'; //Storing options in variable
    }

    my_list.innerHTML = options; //Show options on datalist

    my_list_result.addEventListener("input", function(){

        document.getElementById("result_country").style.display = "none";
        document.getElementById("result_conv_name").style.display = "none";
        document.getElementById("result_conv_sym").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("result_curr").style.display = "block";
        
        for(const symbols2 of Object.keys(currency)){

            let input_result = document.getElementById("curr_input").value;  //Datalist input value
            const currencies2 = currency[symbols2]; //Only keys of the API data

            if(currencies2.currencyName == input_result){

                let currency_symbol = symbols2;

                document.getElementById("crr_chosen").innerHTML = currencies2.currencyName;
                document.getElementById("symbol_curr").innerHTML = currency_symbol;
            }
        }
    })

}

//Function to get the currency list available
async function get_countries(){

    clean_ctr();

    //Variables
    const list_currency = await fetch("https://free.currconv.com/api/v7/countries?apiKey=255b739e9b5bb67c9f82"); //Api fetch
    let data = await list_currency.json(); //Raw data country's info
    let result = data.results; //Get results
    let my_list = document.getElementById("countries"); //Get datalist area
    let my_list2 = document.getElementById("list_input"); //Get list input
    let ctr = []; //Container for countries name
    let options = ''; //Variable to store the options
    
    //Loop through object keys
    for (const symbols of Object.keys(result)){

        const countries = result[symbols]; //Only keys of the API data
        ctr.push(countries.name); //Push country's name to container

    }

    //Loop through countries container
    for(let i = 0; i < ctr.length; ++i){
        options += '<option value="' + ctr[i] + '" />'; //Storing options in variable
    }

    my_list.innerHTML = options; //Show options on datalist

    //Add event listener with anonymous function
    my_list2.addEventListener("input", function(){

        //Variables
        let my_list_result = document.getElementById("list_input").value;  //Datalist input value
        document.getElementById("result_curr").style.display = "none";
        document.getElementById("result_conv_name").style.display = "none";
        document.getElementById("result_conv_sym").style.display = "none";
        document.getElementById("results").style.display = "block"; //Show result area
        document.getElementById("result_country").style.display = "block"; //Show result area
        
        //Loop through keys
        for (const symbols2 of Object.keys(result)){

            //Set countries
            const countries2 = result[symbols2];

            //Seatch for input datalist on API
            if(countries2.name == my_list_result){

                //Get variables
                let sym_c = countries2.currencyId; //Currency ID
                let curr_na = countries2.currencyName; //Currency name 
                let curr_sy = countries2.currencySymbol; //Currency symbol

                //Show results
                document.getElementById("ctr_chosen").innerHTML = countries2.name; //Name
                document.getElementById("symbol_chosen").innerHTML = sym_c; //Country Symbol
                document.getElementById("curr_name_chosen").innerHTML = curr_na; //Currency name
                document.getElementById("curr_sym_chosen").innerHTML = curr_sy; //Currency symbol
            }
        }
    });
}

//Function to clean values
function clean_ctr(){

    //Clean value of input
    document.getElementById("list_input").value = "";
    document.getElementById("curr_input").value = "";
    document.getElementById("conv_1").value = "";
    document.getElementById("amt_conv").value = "";
    document.getElementById("conv_2").value = "";
    document.getElementById("conv_3").value = "";
    document.getElementById("amt_conv_name").value = "";
    document.getElementById("conv_4").value = "";
    document.getElementById("ctr_chosen").innerHTML = "";
    document.getElementById("symbol_chosen").innerHTML = "";
    document.getElementById("curr_name_chosen").innerHTML = "";
    document.getElementById("curr_sym_chosen").innerHTML = "";
    document.getElementById("crr_chosen").innerHTML = "";
    document.getElementById("symbol_curr").innerHTML = "";
    document.getElementById("cnv_chosen_sym").innerHTML = "";
    document.getElementById("cnv_result_sym").innerHTML = "";
    document.getElementById("cnv_chosen_name").innerHTML = "";
    document.getElementById("cnv_result_name").innerHTML = "";
}

//Function to handle convert the money with the symbol
async function sym_conv(){

    let curr_currency = document.getElementById("conv_1").value;
    let curr_amt = document.getElementById("amt_conv").value;
    let curr_desired = document.getElementById("conv_2").value;

    let first_fetch = await fetch(`https://free.currconv.com/api/v7/convert?q=${curr_currency}_${curr_desired}&compact=ultra&apiKey=255b739e9b5bb67c9f82`);
    let data = await first_fetch.json();
    let curr_price = Object.values(data);

    let calculation;

    if(curr_amt == 1){
        calculation = Number(curr_amt) * Number(curr_price);
    }

    else{
        calculation = Number(curr_amt) * Number(curr_price);
        calculation = Math.round(calculation * 100) / 100;
    }

    document.getElementById("result_curr").style.display = "none";
    document.getElementById("result_conv_name").style.display = "none";
    document.getElementById("result_conv_sym").style.display = "block";
    document.getElementById("results").style.display = "block"; //Show result area
    document.getElementById("result_country").style.display = "none";
    
    document.getElementById("cnv_chosen_sym").innerHTML = `${curr_currency.toUpperCase()} $${curr_amt}<br>`;
    document.getElementById("cnv_result_sym").innerHTML = `${curr_desired.toUpperCase()} $${calculation}`;

}

function swap_sym_fun(){

    let curr_currency = document.getElementById("conv_1").value;
    let curr_desired = document.getElementById("conv_2").value;
      
    document.getElementById("conv_1").value = curr_desired;
    document.getElementById("conv_2").value = curr_currency;

}

function swap_na(){

    let curr_curr = document.getElementById("conv_3").value;
    let curr_des = document.getElementById("conv_4").value;

    document.getElementById("conv_3").value = curr_des;
    document.getElementById("conv_4").value = curr_curr;
}

async function conv_name(){
    
    let first_fetch = await fetch("https://free.currconv.com/api/v7/currencies?apiKey=255b739e9b5bb67c9f82");
    let data = await first_fetch.json();
    let results = data.results;
    let curr_names = [];
    let option1  = "";

    for(const symbol of Object.keys(results)){

        let currency_name = results[symbol].currencyName;
        curr_names.push(currency_name);

    }

    for(let i=0; i < curr_names.length; ++i){
        option1 += '<option value="' + curr_names[i] + '" />';
    }
    

    let list1 = document.getElementById("hav_curr");
    let list2 = document.getElementById("des_curr");

    list1.innerHTML = option1;
    list2.innerHTML = option1;

    convert_name.addEventListener("click", async function(){

        let cur_curr = document.getElementById("conv_3").value;
        let want_curr = document.getElementById("conv_4").value;
        let amt = document.getElementById("amt_conv_name").value;
        let cur_sym;
        let want_sym;

        //Loop through to check for hav curr
        for(const symbol2 of Object.keys(results)){

            let currency_name = results[symbol2].currencyName;

            if(currency_name == cur_curr){
                cur_sym = symbol2;
            }

            if(currency_name == want_curr){
                want_sym = symbol2
            }
        }

        let fetch_conversion = await fetch(`https://free.currconv.com/api/v7/convert?q=${cur_sym}_${want_sym}&compact=ultra&apiKey=255b739e9b5bb67c9f82`);
        let data2 = await fetch_conversion.json();
        let price = Object.values(data2);

        let calculation;

        if(amt == 1){
            calculation = Number(amt) * Number(price);
        }

        else if(amt > 1){
            calculation = Number(amt) * Number(price);
            calculation = Math.round(calculation * 100) / 100;
        }

        document.getElementById("result_curr").style.display = "none";
        document.getElementById("result_conv_name").style.display = "block";
        document.getElementById("result_conv_sym").style.display = "none";
        document.getElementById("results").style.display = "block"; //Show result area
        document.getElementById("result_country").style.display = "none";
        
        document.getElementById("cnv_chosen_name").innerHTML = `${cur_sym} $${amt}`;
        document.getElementById("cnv_result_name").innerHTML = `${want_sym} $${calculation}`;
        
    })

}


//Add event listeners
choice_list.addEventListener("change",get_choice); //User choice
clean_countries.addEventListener("click",clean_ctr); //Clean 
clean_curr.addEventListener("click",clean_ctr);
clean_conv.addEventListener("click",clean_ctr);
convert.addEventListener("click",sym_conv);
swap_sym.addEventListener("click",swap_sym_fun);
clean_name.addEventListener("click",clean_ctr);
swap_name.addEventListener("click",swap_na);