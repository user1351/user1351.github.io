function n(o){let r=o.match(/(\{[a-zA-Z0-9]{6}\}|\{[a-zA-Z0-9]{8}\})/g);if(r)for(let s of r){let c=s.replace("{","").replace("}","");o=o.split(s).join(`<span style="color: #${c}">`)}return o}function l(o){const r=o.replace("#",""),s=parseInt(r.substring(0,0+2),16),c=parseInt(r.substring(2,2+2),16),t=parseInt(r.substring(4,4+2),16);return(s*299+c*587+t*114)/1e3>155}export{l as c,n as e};
