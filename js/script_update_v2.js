$(document).ready(function () {
  function generateCSS() {
    var discordID = $("#discord-id").val() || "UserID";
    var normalImageURL = $("#normal-image-url").val() || "ImageURL";
    var talkingImageURL = $("#talking-image-url").val() || normalImageURL;
    var normalImageBrightness = $("#normal-image-brightness").val() || 50;
    var talkingImageBrightness = $("#talking-image-brightness").val() || 100;
    var talkingImageBounce = $("#talking-image-bounce").val() || 10;

    var animate = "";
    if ($("#normal").is(":checked")) {
      animate = `@keyframes speak-now {
                0% { transform: translateY(0);  }
            }`;
    } else if ($("#boing").is(":checked")) {
      animate = `@keyframes speak-now {
                0% { bottom:0px; }
                15% { bottom:${talkingImageBounce}px; }
                30% { bottom:0px; }
            }`;
    } else if ($("#inf_boing").is(":checked")) {
      animate = `@keyframes speak-now {
                0%,
                100% { transform: translateY(0); }
                25% { transform: translateY(-${talkingImageBounce}px); }
                75% { transform: translateY(${talkingImageBounce}px); }
            }`;
    } else if ($("#fuwa_boing").is(":checked")) {
      animate = `@keyframes speak-now {
                0% { transform:translateY(0) rotate(-5deg); }
                50% { transform:translateY(-${talkingImageBounce}px) rotate(0deg); }
                100% { transform:translate(0)rotate(5deg); }
            }`;
    }

    var cssString = `
            li.voice-state:not([data-reactid*="${discordID}"]) { display:none; }
            .avatar {
                content:url(${normalImageURL});
                height:auto !important;
                width:auto !important;
                border-radius:0% !important;
                filter: brightness(${normalImageBrightness}%); 
            }
            
            .speaking {
                content:url(${talkingImageURL});
                border-color:rgba(0,0,0,0) !important;
                position:relative;
                animation-name: speak-now;
                animation-duration: 1s;
                animation-fill-mode:forwards;
                filter: brightness(${talkingImageBrightness}%);
            }
            
            ${animate}
            
            li.voice-state { position: static; }
            div.user { position: absolute; left:40%; bottom:5%; }
            
            .name { display: none; }
            
            body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
        `;

    // Remove whitespace at the beginning and end of the string.
    cssString = cssString.replace(/^\s*/, "").replace(/\s*$/, "");
    $("#css-output").val(cssString);
  }

  function copyCSS() {
    var textarea = $("#css-output");
    navigator.clipboard.writeText(textarea.val()).then(function () {
      console.log('Text copied to clipboard');
    }).catch(function (err) {
      console.error('Could not copy text: ', err);
    });
  }


  $("#generate-css").click(generateCSS);
  $("#copy-css").click(copyCSS);
});
