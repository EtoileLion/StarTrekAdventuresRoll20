var momtokens = [];
var thrtokens = [];
var mom_attr = "";
var thr_attr = "";

on("ready",function() { 
    mom_attr = (momtokens.length > 0) ? momtokens[0].get("currentSide") : 0;
    thr_attr = (thrtokens.length > 0) ? thrtokens[0].get("currentSide") : 0;
    log("Momentum Initial Value: "+mom_attr+" | Threat Initial Value "+thr_attr)
    updatemttokens();
})

on("add:token", function(obj) {
    var oSides = obj.get("sides");
    if(oSides != "") { //This is a rollable token.
      var sides = oSides.split("|").length;
      if (sides == 7) {
          //I assume this was a momentum.
          momtokens.push(obj);
      } else { //Otherwise, it was Threat.
          thrtokens.push(obj);
      }
      if(mom_attr != "") {
          updatemttokens();
      }

    }
});

on("destroy:token", function(obj) {
    var oSides = obj.get("sides");
    if(oSides != "") { //This is a rollable token.
      var sides = oSides.split("|").length;
      if (sides == 7) {
          //I assume this was a momentum.
          momtokens = _.reject(momtokens, function(el) { return el.id == obj.id});
      } else { //Otherwise, it was Threat.
          thrtokens = _.reject(thrtokens, function(el) { return el.id == obj.id});
      }
    } 
});

on("change:token:currentSide", function(obj) {
    var oSides = obj.get("sides");
    var oCurSide = obj.get("currentSide");
    if(oSides != "") { //This is a rollable token.
      var sides = oSides.split("|").length;
      if (sides == 7) {
          mom_attr = oCurSide;
          sendChat("System Message","Momentum Is Now "+oCurSide);
      } else {
          thr_attr = oCurSide;
          sendChat("System Message","Threat Is Now "+oCurSide);          
      }
      updatemttokens();
    } 
});

function updatemttokens() {
    log("Updating tokens with Momentum "+mom_attr+" and Threat "+thr_attr)
    _.each(momtokens,function (token) { 
        var urls = token.get("sides").replace(/med/g,"thumb").split("|");
        token.set({"currentSide":mom_attr, "imgsrc": decodeURIComponent(urls[mom_attr]) }); });
    _.each(thrtokens,function (token) {         
        var urls = token.get("sides").replace(/med/g,"thumb").split("|");
        token.set({"currentSide":thr_attr, "imgsrc": decodeURIComponent(urls[thr_attr]) }); 
    });
   
}
