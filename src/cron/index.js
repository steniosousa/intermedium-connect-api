const cron = require("node-cron");


export function Cron(){
    cron.schedule("* * * * *", () => console.log("Executando a tarefa a cada 1 minuto"));
    return 'funcionando'
}
