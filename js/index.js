(async function ($){
    
    const postPaymentUrl = "https://aplreg2019.us-east-2.elasticbeanstalk.com/webapi/player/postPlayerPayments";
    let getUserDataUrl = "https://aplreg2019.us-east-2.elasticbeanstalk.com/webapi/player/getPlayerPayments?email=";    
    let userData;
    let condition = true;
    while(condition){
        let emailID = prompt ("Enter your email ID");
        switch(emailID.toLocaleLowerCase()){
            case "saralpatel21@gmail.com":
                getUserDataUrl += "saralpatel21@gmail.com";
                condition = false;
                break;
            case "saurabhjain3699@gmail.com":
                getUserDataUrl += "saurabhjain3699@gmail.com";
                condition = false;
                break;
            default:
                alert("Please try again !");
        }
    }
    
    //get the user data over here by fetching the get api
    const getUserData = async (url = '') =>{
        return await fetch(url,{
        });
    }
    const response = await getUserData(getUserDataUrl);
    userData = $.parseJSON(await response.text());
    
      
    
    
    
    
    //populate the form data over here
   var spanClass = "<span class=\"todo-wrap\">"
   var htmlEnd = "</label></span>"
    userData.forEach(user => {
        let userDisplayInfo = user.firstName + " " + user.lastName + "   |   " + user.mobileNumber + "   |   " + user.email;
        if(!user.paid){
            //this condition is for the user who has not paid
            //make sure that label's for attribute and input's id attribute should have same value
            // input's value attribute should not be changed, do not change it
            $( "#todo-list" ).append( spanClass + "<input type=\"checkbox\" id=" + user._id+" value="+ user._id+" name=\"user\">" + 
                           "<label for=" + user._id+" class=\"todo\"><i class=\"fa fa-check\"></i>" + userDisplayInfo + htmlEnd );
        }
        else{
            //user has paid the registration fees
            $( "#todo-list" ).append( spanClass + "<input type=\"checkbox\" id=" + user._id+" value="+ user._id+" name=\"user\" checked>" + 
                           "<label for=" + user._id+" class=\"todo\"><i class=\"fa fa-check\"></i>" + userDisplayInfo + htmlEnd );
        }
        
    })
    
    
    $('#add-todo').click(async function(){
        const postData = async (url = ``, data = {}) => {
  // Default options are marked with *
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
}

        
        //make json for unchecked data
        
        var userData = [];
            $.each($("input[name='user']:not(:checked)"), function(){   
                var user = {"_id":$(this).val(),"paid":false}
                userData.push(user);
            });
        //make json for checked data
        $.each($("input[name='user']:checked"), function(){   
                var user = {"_id":$(this).val(),"paid":true}
                userData.push(user);
            });
        
        //console.log(userData);
        
        const response = await postData(postPaymentUrl, userData);
        if(await response.text() === "success"){
            alert("Data saved successfully");
        }else{
            alert("There is some error, see if refreshing the page helps otherwise please contact Kandi... JSN !");
        }
});

})(jQuery)// add items
