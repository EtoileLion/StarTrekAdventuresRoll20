var momtokens = [];
var thrtokens = [];
var momthr_gmsheet = "";
var mom_attr = "";
var thr_attr = "";

on("ready",function() { 
    momthr_gmsheet = findObjs({type:'character',name:'GMSheet'})[0];
    mom_attr = findObjs({type: 'attribute',characterid: momthr_gmsheet.id, name: "Momentum"})[0]
    thr_attr = findObjs({type: 'attribute',characterid: momthr_gmsheet.id, name: "Threat"})[0]
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
      if(momthr_gmsheet != "") {
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
          mom_attr.set("current",oCurSide);
          sendChat("System Message","Momentum Is Now "+oCurSide);
      } else {
          thr_attr.set("current",oCurSide);
          sendChat("System Message","Threat Is Now "+oCurSide);          
      }
      updatemttokens();
    } 
});

function updatemttokens() {
    _.each(momtokens,function (token) { 
        var urls = token.get("sides").replace(/med/g,"thumb").split("|");
        token.set({"currentSide":mom_attr.get('current'), "imgsrc": decodeURIComponent(urls[mom_attr.get('current')]) }); });
    _.each(thrtokens,function (token) {         
        var urls = token.get("sides").replace(/med/g,"thumb").split("|");
        token.set({"currentSide":thr_attr.get('current'), "imgsrc": decodeURIComponent(urls[thr_attr.get('current')]) }); 
    });
   
}
