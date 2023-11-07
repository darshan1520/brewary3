import { LightningElement } from 'lwc';

export default class BreweryResults extends LightningElement {
    radioValue = '';
    boolVal = false;
    data = [];
    brewNameValue = '';
    cityNameValue = '';
    calloutURI = 'https://api.openbrewerydb.org/v1/breweries?';
    columns = [
        { label: 'Brewery Name', fieldName: 'name' },
        { label: 'Brewery Address', fieldName: 'address_1' },
        { label: 'Phone Number', fieldName: 'phone', type: 'phone' },
        { label: 'Website URL', fieldName: 'website_url', type: 'url' },
        { label: 'Current Rating', fieldName: 'curRating' },
        { label: 'State', fieldName: 'state' },
        { label: 'City', fieldName: 'city' },
        { label: 'Brewery Type', fieldName: 'brewery_type' },
    ];

    get typeOptions() {
        return [
            { label: 'micro', value: 'micro' },
            { label: 'nano', value: 'nano' },
            { label: 'regional', value: 'regional' },
            { label: 'brewpub', value: 'brewpub' },
            { label: 'large', value: 'large' },
            { label: 'planning', value: 'planning' },
            { label: 'bar', value: 'bar' },
            { label: 'contract', value: 'contract' },
            { label: 'proprietor', value: 'proprietor' },
            { label: 'closed', value: 'closed' },
        ];
    }

    get selectedValues() {
        return this.value.join(',');
    }

    handleTypeChange(e) {
        this.radioValue = e.detail.value;
    }

    handleBrewName(e){
        this.brewNameValue = e.detail.value;
    }

    handleCityName(e){
        this.cityNameValue = e.detail.value;
        if(this.checkIfWordHasSpace(e.detail.value)){
            this.cityNameValue = this.replaceSpacesWithUnderscores(e.detail.value);
        }
        console.log('final cityNameValue->'+this.cityNameValue);
    }

    checkIfWordHasSpace(word) {
        return /\s/.test(word);
    }
      
    replaceSpacesWithUnderscores(word) {
        return word.replace(/\s/g, "_");
    }

    handleSearch(e){
        
        console.log('radioValue->'+this.radioValue);
        if(this.radioValue == '' || this.radioValue === null){
            this.calloutURI = this.calloutURI+'by_name='+this.brewNameValue+'&by_city='+this.cityNameValue;//+'&by_type='+this.radioValue;
        }
        else{
            this.calloutURI = this.calloutURI+'by_name='+this.brewNameValue+'&by_city='+this.cityNameValue+'&by_type='+this.radioValue;
        }
        
        console.log('finalQuery->'+this.calloutURI);
        fetch(this.calloutURI, {
            method: "GET"
        }).then((response) => response.json())
            .then(repos => {
                console.log(repos)
                this.data = repos;
                this.boolVal = true;
                console.log('data->'+JSON.stringify(this.data));
            });

            this.calloutURI = 'https://api.openbrewerydb.org/v1/breweries?';
    }

    // async-await method 
    
    
}
