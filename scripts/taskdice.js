on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!taskdice ") !== -1) {
        //Parse Input
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
                if (focus && die <= rolldata.discv) { succ++; }
                else if (die == 1) { succ++; }
                succ++;
                dieout.push("<span style='color:#247305'>"+die+"</span>");
            }
            else {
                dieout.push("<span>"+die+"</span>");
            }
        }

        //Format the Output
        var textout = '<div class="sheet-rolltemplate-lcars"><table> \
        <tbody> \
        <tr><td><div class="sheet-rolltemplate-headbar" style="background-color:#FF9900"><span style="background-color:white;color:#FF9900">'+rolldata.disc.toUpperCase()+' TASK';
        if(focus) { textout += ' (FOCUSSED)'; }
        textout += '</span></div></td></tr> \
        <tr><td class="sheet-diff">DIFFICULTY: '+diff+'</td></tr> ';
        if(rolldata.attr != "None") {
            textout += '<tr><td class="sheet-attr">'+rolldata.attr.toUpperCase()+': '+rolldata.attrv+'</td></tr>';
        }
        if(rolldata.disc != "Unspecified") {
            textout += '<tr><td class="sheet-discp">'+rolldata.disc.toUpperCase()+': '+rolldata.discv+'</td></tr>';
        }
        if(cr != 20) {
            textout += '<tr><td class="sheet-discp">COMPLICATION RANGE: '+cr+'-20</td></tr>';
        }
        textout += '<tr><th>'+dieout.join()+'</th></tr>';
        if(succ >= diff) {
            textout +='<tr><th style="padding-top:0px;"><div class="sheet-rolltemplate-headbar sheet-rolltemplate-taskbar" style="background-color:#247305"><span style="background-color:white;color:#247305;margin-left:0px;padding-right:3px;">TASK SUCCESSFUL ('+succ+')</span></div></th></tr>';
            if(succ > diff) {
                textout +='<tr><th style="padding-top:0px;">'+(succ-diff)+' MOMENTUM</th></tr>';                
            }
        } else{
            textout +='<tr><th style="padding-top:0px;"><div class="sheet-rolltemplate-headbar sheet-rolltemplate-taskbar" style="background-color:#730505"><span style="background-color:white;color:#730505;margin-left:0px;padding-right:3px;">TASK FAILED</span></div></th></tr>';
        }
        if (cons > 0) {
            textout += '<tr><th style="padding-top:0px;">'+cons+' COMPLICATION'+((cons > 1) ? 'S' : '')+'</th></tr>';
        }
        textout += '</tbody></table></div>';        
        sendChat(msg.who,textout);
        log(succ+"-"+diff+"="+(succ-diff))
        } else {
            sendChat(msg.who,'/w "'+msg.who.replace(/\s\(GM\)/,"")+'" Malformed Task Dice Roll.');
        }        
    }
});
