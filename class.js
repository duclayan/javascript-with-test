//jshint esnext:true
export default class contact {
    constructor(name,email,vip,free){
        let nameCutter = name.split(' ');
        this.firstName = nameCutter[0];
        this.lastName = nameCutter[1];
        this.introsOffered = {vip: vip, free:free}
        this.contactOption = 'free'
        this.email = email;
        // this.introsOffered = introsOffered;
    }
}
// Holds collection of contats,properties and functions of the group
export default class contactOptions {
    constructor(){
        this.contactOptions = []
    }

    newContact(name, email,vip,free){
        let x = new contact(name,email,vip,free);
        this.contactOptions.push(x)
        return x
    }

    get sortedFamilyName() {
        let current = this.contactOptions
        return (current.sort(function(a, b){
            if(a.lastName < b.lastName) { return -1; }
            if(a.lastName > b.lastName) { return 1; }
            return 0;
        }))
    }

    get sortedFirstName() {
        let current = this.contactOptions
        return (current.sort(function(a, b){
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        }))
    }

    get update() {
      let vip_offer = this.contactOptions[0]
      vip_offer.contactOption = 'VIP'
      
      this.contactOptions.forEach(function(item,index){
          item.count = index
          // Calculate rank score
          item.rankScore = 3 + item.introsOffered.free + item.introsOffered.vip
          // Calculate rank score by email address
          let email = item.email.split("@")
          let isEmailUnique = true
     
          switch(email[1]){
            case 'gmail.com':
            case 'hotmail.com':
            case 'outlook.com':
              isEmailUnique = false;
          }

          if (isEmailUnique == true){
           item.rankScore +=2
          }
        
        console.log('boolean', vip_offer.rankScore < item.rankScore)
        console.log(item.introsOffered.vip == 0)

          if (item.introsOffered.vip == 0 && vip_offer.rankScore < item.rankScore) {
            vip_offer.contactOption = 'free'
            item.contactOption = 'VIP'
            vip_offer = item
          }
      })
        return this.contactOptions
    }
}

let contacts = new contactOptions()
contacts.newContact("John Doe", "Jphn@brdg.app", 0,14)
contacts.newContact("Billy Ray Jenkins", "bily.jenkins@gmail.com",6,0)


// Get the total scores
console.log(contacts.update)
// Order by FirstName
console.log(contacts.sortedFirstName)
// Order by LastName
console.log(contacts.orderbyFamilyName)




