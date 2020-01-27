({
    handleClick : function(component, event, helper) {
        var CityField = component.find('City');
        CityField.showHelpMessageIfInvalid();
        var validCity = CityField.get('v.validity').valid;
		var cityf = component.get('v.KeyCity');
        if(validCity){
           var callApexMethod = component.get('c.getWeather');
           callApexMethod.setParams({
           		"city" : cityf   
           });
           callApexMethod.setCallback(this, function(a){
           		var state = a.getState();
                if(state =='SUCCESS' && helper.parseData(a.getReturnValue())!='error'){       
                	var dd = helper.parseData(a.getReturnValue());
                    console.log(helper.parseData(a.getReturnValue()));
                    component.set("v.get",helper.parseData(a.getReturnValue()) );	
                    component.set('v.image', 'http://openweathermap.org/img/wn/'+dd.weather[0].icon+'@2x.png');
                }else{
                     var callApexMethod2 = component.get('c.getWeather')
                     callApexMethod2.setParams({
           				"city" : component.get('v.store')
                     });
                     callApexMethod2.setCallback(this, function(a){
                        var state = a.getState();
                        if(state =='SUCCESS' && helper.parseData(a.getReturnValue())!='error'){
                             
                             var dd = helper.parseData(a.getReturnValue());
							 component.set("v.get",helper.parseData(a.getReturnValue()) );
                        	 component.set('v.image', 'http://openweathermap.org/img/wn/'+dd.weather[0].icon+'@2x.png');
                        }
                	 });       
                	$A.enqueueAction(callApexMethod2);
                }
           });
         	 $A.enqueueAction(callApexMethod);
            } 
       	},
    doInit: function(component, event, helper){
      	var call = component.get('c.getMetaCity');
        call.setCallback(this, function(b){
            var state = b.getState();
            if(state == 'SUCCESS'){
                var mdtCity = b.getReturnValue();
                component.set('v.store', mdtCity[0].Label);
                var callApexMethod = component.get('c.getWeather');
           		callApexMethod.setParams({
           			"city" : component.get('v.store') 
           		});
           		callApexMethod.setCallback(this, function(a){	
               		console.log(a.getReturnValue());
               		var dd = helper.parseData(a.getReturnValue());
               		component.set("v.get",helper.parseData(a.getReturnValue()) );	
               		component.set('v.image', 'http://openweathermap.org/img/wn/'+dd.weather[0].icon+'@2x.png');           
           		});
        		$A.enqueueAction(callApexMethod);  
            }
        });
        $A.enqueueAction(call);
    }
})