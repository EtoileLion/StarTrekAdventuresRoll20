on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!chaldice ") !== -1) {
        var rolldata = JSON.parse(msg.content.substring(10));        
        var dice = 2;
        var effects = 0;
        var score = 0;
        var dieout = []
        var diestring = "0ab";
        if(rolldata.hasOwnProperty('dice')) { dice = rolldata.dice; }
        for(i = 0; i < dice; i++) {
            die = randomInteger(6);
            if(die <= 2) {
                dieout.push("<span style='font-family:dicefontd6'>"+(diestring[die])+"</span>")
                score += die
            } else if(die < 5) {
                dieout.push("<img src='http://imgsrv.roll20.net/?src=raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Star%2520Trek%2520Adventures%25202d20/logosmall.png' />")
                effects++;
                score++;
            } else {
                dieout.push("<span style='font-family:dicefontd6'>0</span>")
            }
        }
        
        var textout = '<div class="sheet-rolltemplate-challengeroll"><table> \
        <tbody> \
        <tr><td><div class="sheet-rolltemplate-headbar" style="background-color:red"><span style="background-color:black;color:white">CHALLENGE ROLL</span></div></th></tr> \
        <tr><th class="sheet-rolltemplate-challengeroll-dice">'+dieout.join()+'</th></tr> \
        <tr><th class="sheet-rolltemplate-challengeroll-result">RESULT: '+score;
        if (effects > 0) {
            textout += ' + '+effects+' EFFECT'+((effects > 1) ? 'S' : '');
        }
        textout += '</th></tr></tbody></table></div>';        
        sendChat(msg.who,textout);
    }
});
