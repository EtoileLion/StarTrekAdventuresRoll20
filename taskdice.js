on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!taskdice ") !== -1) {
        //Parse Input
        log("Input Received: "+msg.content.substring(10));
        var rolldata = JSON.parse(msg.content.substring(10));
        var dice = 2;
        var diff = 1;
        var cr = 20;
        var focus = false;
        var succ = 0;
        var cons = 0;
        var dieout = [];
        var tn = 0;
        
        if(rolldata.hasOwnProperty('attr') && rolldata.hasOwnProperty('disc') && rolldata.hasOwnProperty('attrv') && rolldata.hasOwnProperty('discv')) {
            tn = rolldata.attrv+rolldata.discv;
        if(rolldata.hasOwnProperty('dice')) { dice = rolldata.dice; }
        if(rolldata.hasOwnProperty('cr')) { cr = rolldata.cr; }        
        if(rolldata.hasOwnProperty('focus')) { focus = rolldata.focus; }        
        if(rolldata.hasOwnProperty('diff')) { diff = rolldata.diff; }                
        
        //Roll the dice.
        for(i = 0; i < dice; i++) {
            die = randomInteger(20);
            if(die >= cr) { 
                cons++;
                dieout.push("<span style='color:#730505'>"+die+"</span>");
            }
            else if(die <= tn) { 
                if (focus) { succ++; }
                else if (die == 1) { succ++; }
                succ++;
                dieout.push("<span style='color:#247305'>"+die+"</span>");
            }
            else {
                dieout.push("<span>"+die+"</span>");
            }
        }
        log(dieout);
        //Format the Output
        var textout = '<div class="sheet-rolltemplate-lcars"><table> \
        <tbody> \
        <tr><th>'+rolldata.disc+' Task';
        if(focus) { textout += ' (Focussed)'; }
        textout += '</th></tr> \
        <tr><td class="sheet-diff">Task Difficulty: '+diff+'</td></tr> \
        <tr><td class="sheet-attr">'+rolldata.attr+': '+rolldata.attrv+'</td></tr> \
        <tr><td class="sheet-discp">'+rolldata.disc+': '+rolldata.discv+'</td></tr>';
        if(cr != 20) {
            textout += '<tr><td class="sheet-discp">Complication Range: '+cr+'-20</td></tr>';
        }
        textout += '<tr><th>'+dieout.join()+'</th></tr>';
        if(succ >= diff) {
            textout +='<tr><th style="padding-top:0px;color:#247305">Task Successful</th></tr>';
            if(succ > diff) {
                textout +='<tr><th style="padding-top:0px;">'+(succ-diff)+' Momentum</th></tr>';                
            }
        } else{
            textout +='<tr><th style="padding-top:0px;color:#730505">Task Failed</th></tr>';
        }
        if (cons > 0) {
            textout += '<tr><th style="padding-top:0px;">'+cons+' Complications</th></tr>';
        }
        textout += '</tbody></table></div>';        
        sendChat(msg.who,textout);
        } else {
            var whoOut = msg.who;
            if(whoOut.indexOf(" (GM)") !== -1) { whoOut = whoOut.substring(0,whoOut.length-5); }
            sendChat(msg.who,'/w "'+whoOut+'" Malformed Task Dice Roll.');
        }        
    }
});
