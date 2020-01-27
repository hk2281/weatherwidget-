@isTest
private class WeatherControllerTest {

    @isTest
	static void testGetWeather() {
        String str = myWeatherContr.getWeather('dsafkjhadkf');
        System.debug(str);
        System.assertNotEquals(str, null);
    }
    @isTest
    static void testGetWeather1(){
		Test.setMock(HttpCalloutMock.class, new testCalloutMock()); 
        
        string response = myWeatherContr.getWeather('brest');
        string actualValue = response ; 
        String expectedValue = '{"coord":{"lon":23.7,"lat":52.1},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":272.15,"feels_like":268.62,"temp_min":272.15,"temp_max":272.15,"pressure":1014,"humidity":100},"visibility":1200,"wind":{"speed":2,"deg":260},"clouds":{"all":90},"dt":1580117403,"sys":{"type":1,"id":8930,"country":"BY","sunrise":1580105635,"sunset":1580137287},"timezone":10800,"id":629634,"name":"Brest","cod":200}';
    	System.assertEquals(actualValue, expectedValue);
 
    }
    
    static testMethod void TestSOQL(){
		list<city_c__mdt> ff = myWeatherContr.getMetaCity();
        list<city_c__mdt> actual = new list<city_c__mdt>();
        actual = ff;
        System.assertEquals(ff, actual);
    }
}