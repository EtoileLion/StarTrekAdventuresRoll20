on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!charinacan ") !== -1) {
        var rolldata = JSON.parse(msg.content.substring(12));
        var pubout = false;
        if(!rolldata.hasOwnProperty("generation")) { rolldata.generation = "TNG"; }
        if(rolldata.hasOwnProperty("public")) { pubout = rolldata.public; }
        var species = [];
        switch(rolldata.generation) {
            case "ENT":
                species = ["Andorian","Denobulan","Human","Human","Human","Human","Human","Human","Tellarite","Vulcan"];
            break;
            case "TOS":
                species = ["Andorian","Denobulan","Human","Human","Human","Human","Human","Tellarite","Trill","Vulcan"];
            break;
            case "TNG":
                species = ["Andorian","Bajoran","Betazoid","Denobulan","Human","Human","Human","Tellarite","Trill","Vulcan"];
            break;
            default:
                sendChat(msg.who,'/w "'+msg.who.replace(" (GM)","")+'" Invalid Generation for Character In A Can.');
            break;
        }
        var environments = ["Homeworld","Busy Colony","Isolated Colony","Frontier Colony","Starship/Starbase","Another Species' World"];
        var upbringings = ["Starfleet","Business/Trade","Argiculture/Rural","Science/Tech","Artistic/Creative","Diplomacy/Politics"];
        var academies = ["Command","Operations","Sciences"];
        var careers = ["Young","Experienced","Veteran"];
        var events = ["Ship Destroyed","Death of a Friend","Lauded by Another Culture","Negotiate a Treaty","Required to Take Command","Encounter with a Truly Alien Being","Serious Injury","Conflict with a Hostile Culture","Mentored","Transporter Accident","Dealing with a Plague","Betrayed Ideals for a Superior","Called Out a Superior","New Battle Strategy","Learns Unique Language","Discovers an Artefact","Special Commendation","Solved an Engineering Crisis","Breakthrough or Invention","First Contact"];
        var genders = ["Male","Female"]
        
        var race = species[(randomInteger(10)-1)];
        var environment = environments[(randomInteger(6)-1)];
        var upbringing = upbringings[(randomInteger(6)-1)];
        var career = careers[(randomInteger(3)-1)];
        var gender = genders[(randomInteger(2)-1)];
        var academy = academies[(randomInteger(3)-1)];
        var eventid = randomInteger(20);
        var eventid2 = randomInteger(20);
        while (eventid2 == eventid) {
            eventid2 = randomInteger(20);
        }
        
        var textout = '<div class="sheet-rolltemplate-lcars"><table><tbody><tr><td><div class="sheet-rolltemplate-headbar" style="background-color:#FF9900"><span style="background-color:white;color:#FF9900">CHARACTER IN A CAN</span></div></td></tr><tr><td class="sheet-diff" style="font-size:1.4em;line-height:1em;text-transform:uppercase">RACE: '+race+'<br />ENVIRONMENT: '+environment+'<br />UPBRINGING: '+upbringing+'<br />ACADEMY: '+academy;
        if (rolldata.hasOwnProperty('full')) {
            textout += '<br />Experience: '+career+' Officer<br />Gender: '+gender;
        }
        textout += '<br />Career Events: '+events[eventid-1]+', '+events[eventid2-1]+'</td></tr></tbody></table></div>';
        if (pubout) {
            sendChat(msg.who,textout);
        } else {
            sendChat("CharInACan","/w \""+msg.who.replace(/\s\(GM\)/,"")+"\" "+textout)
        }
    }
});