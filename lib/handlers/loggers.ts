import pino from 'pino'


const isEdge = process.env.NEXT_RUNTIME === 'edge';
const isProduction = process.env.NODE_ENV === 'production';


/**
 * Konfigurált Pino logger példány az alkalmazás szintű naplózáshoz.
 * 
 * @remarks
 * A logger a következő funkciókkal van konfigurálva:
 * - A naplózási szint a LOG_LEVEL környezeti változóból származik (alapértelmezetten 'info')
 * - Pino-pretty transport használata produkciós környezetben (kivéve edge runtime esetén)
 * - Testreszabott napló formázás:
 *   - A naplózási szintek nagybetűvel jelennek meg
 *   - Az időbélyegek ISO formátumot használnak
 *   - A produkciós környezetben színes megjelenítés és szűrt metaadatok
 * 
 * @example
 * ```typescript
 * logger.info('Alkalmazás elindult');
 * logger.error('Hiba történt', { error });
 * ```
 */
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport:  !isEdge && isProduction ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard',
        },
    } 
    : undefined,
    formatters: {
       level: (label) => ({
        level: label.toUpperCase()
       }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;