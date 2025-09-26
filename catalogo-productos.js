// Catálogo completo de productos INRAPARTES (fallback si no existe window.PRODUCTOS_GENERADOS)
const productosCompletos = [
    // ACOPLES
    {
        id: 1,
        imagen: "fotos_organizadas/fotos racores/ACOPLE RAPIDO.JPG",
        nombre: "ACOPLE RAPIDO CON FITTING LISO",
        categoria: "ACOPLES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 2,
        imagen: "fotos_organizadas/fotos racores/CONECTOR ACOPLE HEMBRA.JPG",
        nombre: "CONECTOR ACOPLE HEMBRA",
        categoria: "ACOPLES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 3,
        imagen: "fotos_organizadas/fotos racores/CONECTOR ACOPLE LISO.JPG",
        nombre: "CONECTOR ACOPLE LISO",
        categoria: "ACOPLES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 4,
        imagen: "fotos_organizadas/fotos racores/CONECTOR ACOPLE MACHO.JPG",
        nombre: "CONECTOR ACOPLE MACHO",
        categoria: "ACOPLES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 5,
        imagen: "fotos_organizadas/fotos racores/UNION BI.JPG",
        nombre: "UNION BI o ESPIGO",
        categoria: "ACOPLES",
        medidas: "3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 1\""
    },

    // RACORES
    {
        id: 6,
        imagen: "fotos_organizadas/fotos racores/B1.JPG",
        nombre: "RACOR BOSTER",
        categoria: "RACORES",
        medidas: "3/16-1/2, 3/16-9/16, 1/4-1/2, 1/4-9/16, 5/16-1/2, 5/16-9/16"
    },
    {
        id: 7,
        imagen: "fotos_organizadas/fotos racores/B2.JPG",
        nombre: "HEMBRA MANGUERA",
        categoria: "RACORES",
        medidas: "1/4, 1/4-5/16, 3/8, 1/2, 9/16 IZQUIERDO, 9/16 DERECHO, FIJO 1/4-1/4, FIJO 3/8-3/8, FIJO 1/2-3/8, FIJO 1/2-1/2, 3/8 HEMBRA MAGUERA GAS"
    },
    {
        id: 8,
        imagen: "fotos_organizadas/fotos racores/B3 90G.JPG",
        nombre: "CODO MACHO MANGUERA",
        categoria: "RACORES",
        medidas: "1/8-1/4 90°, 1/8-5/16 90°, 1/8-3/8 90°, 1/4-1/4 90°, 1/4-5/16 90°, 1/4-3/8 90°, 1/4-1/2 90°, 3/8-1/4 90°, 3/8-5/16 90°, 3/8-3/8 90°, 3/8-1/2 90°, 1/2-3/8 90°, 1/2-1/2 90°"
    },
    {
        id: 9,
        imagen: "fotos_organizadas/fotos racores/B3 CODO ESPIGO.JPG",
        nombre: "CODO ESPIGO",
        categoria: "RACORES",
        medidas: "1/4, 5/16, 3/8"
    },
    {
        id: 10,
        imagen: "fotos_organizadas/fotos racores/B3 T ESPIGO.JPG",
        nombre: "TEE ESPIGO",
        categoria: "RACORES",
        medidas: "3/16, 1/4, 5/16, 3/8, 1/2"
    },
    {
        id: 11,
        imagen: "fotos_organizadas/fotos racores/B3.JPG",
        nombre: "MACHO MANGUERA",
        categoria: "RACORES",
        medidas: "3/16-3/16, 1/8-1/8, 1/8-3/16, 1/8-1/4, 1/8-5/16, 1/8-3/8, 1/4-3/16, 1/4-1/4, 1/4-5/16, 1/4-3/8, 1/4-1/2, 3/8-1/4, 3/8-5/16, 3/8-3/8, 3/8-1/2, 3/8-5/8, 1/2-1/4, 1/2-5/16, 1/2-3/8, 1/2-1/2, 1/2-5/8, 1/2-3/4, 3/4-1/2, 3/4-3/4, 1\"-1\", 1/2-3/8 MACHO MANGUERA GAS"
    },
    {
        id: 12,
        imagen: "fotos_organizadas/fotos racores/B5.JPG",
        nombre: "B5",
        categoria: "RACORES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 13,
        imagen: "fotos_organizadas/fotos racores/B11.JPG",
        nombre: "B11",
        categoria: "RACORES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 14,
        imagen: "fotos_organizadas/fotos racores/B12.JPG",
        nombre: "HEMB. CIL. MACHO NPT.",
        categoria: "RACORES",
        medidas: "1/8-1/8"
    },
    {
        id: 15,
        imagen: "fotos_organizadas/fotos racores/B20.JPG",
        nombre: "TAPON ROSCA CILINDRICA",
        categoria: "RACORES",
        medidas: "3/16, 1/4, 3/8, 1/2, 10 X 1 CTO, 10 X 1 LGO"
    },
    {
        id: 16,
        imagen: "fotos_organizadas/fotos racores/B21.JPG",
        nombre: "MACHO ORIFICIO PARA TUBO Y MILIMETRICOS",
        categoria: "RACORES",
        medidas: "3/16 CTO, 3/16 LGO, 1/4 CTO, 1/4 LGO, 1/4-3/16, 5/16 CTO, 5/16 LGO, 5/16-3/16, 5/16-1/4, 3/8, 1/2, 9/16-3/16, 9/16-1/4, 9/16-5/16, 9-1 TOYOTA, 10-1 CTO V/WAGEN, 10-1 LGO TOYOTA RENAULT, 10-1.25 CTO FIAT, 10-1.25 LGO FIAT, 12-1-3/16, 12-1-1/4 CARPATI, 12-1.25-3/16, 12-1.25-1/4"
    },
    {
        id: 17,
        imagen: "fotos_organizadas/fotos racores/B22.JPG",
        nombre: "ROSCA INT. CILIND. / EXT. NPT",
        categoria: "RACORES",
        medidas: "3/16-1/8, 1/4-1/8, 1/4-1/8 ESP, 1/4-1/4, 5/16-1/8, 5/16-1/8 ESP, 5/16-1/4, 3/8-1/8, 3/8-3/8, 1/2-1/4"
    },
    {
        id: 18,
        imagen: "fotos_organizadas/fotos racores/B23.JPG",
        nombre: "ROSCA INT. CILIND.",
        categoria: "RACORES",
        medidas: "3/16, 3/16 LGO, 1/4, 5/16, 10-1 CTO, 10-1 LGO"
    },
    {
        id: 19,
        imagen: "fotos_organizadas/fotos racores/B24.JPG",
        nombre: "R. INT CILIND. / EXT NPT",
        categoria: "RACORES",
        medidas: "3/16-1/8, 3/16-1/4, 1/4-1/8, 1/4-1/4, 5/16-1/8, 5/16-1/4, 3/8-1/4, 1/2-1/4"
    },
    {
        id: 20,
        imagen: "fotos_organizadas/fotos racores/B26.JPG",
        nombre: "B26",
        categoria: "RACORES",
        medidas: "Consultar medidas disponibles"
    },
    
    // RACORES CONTINUACIÓN
    {
        id: 21,
        imagen: "fotos_organizadas/fotos racores/B41.JPG",
        nombre: "TUERCA COPA Y TUERCA REFRIGERACION",
        categoria: "RACORES",
        medidas: "3/16 RO, 1/4 RO, 5/16 RO, 3/8 RO, 1/2 RO, 5/8 RO, 3/4 RO, 3/8 BW, 1/4 RF, 5/16 RF, 3/8 RF, 1/2 RF, 5/8 RF, 1/4 REFRIGERACION, 3/8 REFRIGERACION"
    },
    {
        id: 22,
        imagen: "fotos_organizadas/fotos racores/B42.JPG",
        nombre: "UNION DE REBORDE",
        categoria: "RACORES",
        medidas: "3/16, 1/4, 5/16, 3/8, 3/8-5/16, 1/2, 5/8, 3/4"
    },
    {
        id: 23,
        imagen: "fotos_organizadas/fotos racores/B44.JPG",
        nombre: "TEE DE REBORDE",
        categoria: "RACORES",
        medidas: "1/4, 3/8, 1/2"
    },
    {
        id: 24,
        imagen: "fotos_organizadas/fotos racores/B46.JPG",
        nombre: "HEMBRA DE REBORDE",
        categoria: "RACORES",
        medidas: "3/16-1/8, 1/4-1/8, 1/4-1/4, 5/16-1/8, 5/16-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 1/2-1/4, 1/2-3/8, 1/2-1/2, 5/8-1/2"
    },
    {
        id: 25,
        imagen: "fotos_organizadas/fotos racores/B48.JPG",
        nombre: "MACHO DE REBORDE",
        categoria: "RACORES",
        medidas: "1/8-1/8, 3/16-1/8, 1/4-1/8, 1/4-1/4, 5/16-1/8, 5/16-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 3/8-1/2, 1/2-1/4, 1/2-3/8, 1/2-1/2, 9/16-1/8, 9/16-1/4, 9/16-9/16, 5/8-1/4, 5/8-3/8, 5/8-1/2, 3/4-1/2, 3/4-3/4"
    },
    {
        id: 26,
        imagen: "fotos_organizadas/fotos racores/B49.JPG",
        nombre: "CODO DE REBORDE",
        categoria: "RACORES",
        medidas: "3/16-1/8, 1/4-1/8, 1/4-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 3/8-1/2, 1/2-1/4, 1/2-3/8, 1/2-1/2, 5/8-1/4, 5/8-3/8, 5/8-1/2, 1/4-1/8 45°"
    },
    {
        id: 27,
        imagen: "fotos_organizadas/fotos racores/B60.JPG",
        nombre: "ANILLO O GARBANZO",
        categoria: "RACORES",
        medidas: "1/8, 5/32, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 1/4 MONOSHIP, 6MM, 10MM, 12MM"
    },
    {
        id: 28,
        imagen: "fotos_organizadas/fotos racores/B61.JPG",
        nombre: "TUERCA",
        categoria: "RACORES",
        medidas: "1/8, 5/32, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 1/4 MONOSHIP, 6MM, 10MM, 12MM"
    },
    {
        id: 29,
        imagen: "fotos_organizadas/fotos racores/B62.JPG",
        nombre: "UNION CON ANILLOS",
        categoria: "RACORES",
        medidas: "1/8, 5/32, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 6MM, 10MM, 12MM"
    },
    {
        id: 30,
        imagen: "fotos_organizadas/fotos racores/B64.JPG",
        nombre: "TEE CON ANILLOS / DOS ROSCAS OD Y UNA NPT",
        categoria: "RACORES",
        medidas: "3/16, 1/4, 5/16, 3/8, 1/2, 5/8 / 1/4 OD-1/8 NPT, 3/8 OD-1/4 NPT"
    },
    {
        id: 31,
        imagen: "fotos_organizadas/fotos racores/B65.JPG",
        nombre: "CODO CON ANILLOS",
        categoria: "RACORES",
        medidas: "3/16, 1/4, 3/8, 1/2, 3/4"
    },
    {
        id: 32,
        imagen: "fotos_organizadas/fotos racores/B66.JPG",
        nombre: "CODO CON ANILLOS",
        categoria: "RACORES",
        medidas: "1/8-1/8, 1/8-7/16 CILINDRICO, 3/16-1/8, 3/16-7/16 CILINDRICO, 1/4-1/8, 1/4-1/4, 1/4-7/16 CILINDRICO, 5/16-1/8, 5/16-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 3/8-1/2, 1/2-3/8, 1/2-1/2, 5/8-1/2"
    },
    {
        id: 33,
        imagen: "fotos_organizadas/fotos racores/B68 MONO.JPG",
        nombre: "MONOSHIP",
        categoria: "RACORES",
        medidas: "CTO, LGO, XL"
    },
    {
        id: 34,
        imagen: "fotos_organizadas/fotos racores/B68.JPG",
        nombre: "UNION ANILLO- MACHO NPT",
        categoria: "RACORES",
        medidas: "1/8-1/8, 5/32-1/8, 3/16-1/8, 3/16-1/4, 1/4-1/8, 1/4-3/16, 1/4-1/4, 1/4-3/8, 1/4-1/2, 5/16-1/8, 5/16-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 3/8-1/2, 1/2-1/4, 1/2-3/8, 1/2-1/2, 5/8-1/4, 5/8-3/8, 5/8-1/2, 3/4-1/2, 3/4-3/4, 6MM-1/8, 6MM-1/4, 10MM-3/8, 10MM-1/2, 10MM-1/4, 12MM-3/8, 12MM-1/2, 12MM-16MM P1.5"
    },
    {
        id: 35,
        imagen: "fotos_organizadas/fotos racores/B69.JPG",
        nombre: "CODO ANILLO- MACHO NPT",
        categoria: "RACORES",
        medidas: "1/8-1/8, 3/16-1/8, 5/32-1/8, 1/4-1/8, 1/4-1/4, 1/4-3/8, 1/4-1/2, 5/16-1/8, 5/16-1/4, 5/16-3/8, 3/8-1/8, 3/8-1/4, 3/8-3/8, 3/8-1/2, 1/2-1/4, 1/2-3/8, 1/2-1/2, 5/8-1/4, 5/8-3/8, 5/8-1/2, 3/4-1/2, 3/4-3/4, 12MM-1/4, 12MM-3/8, 12MM-1/2, 1/4-1/8 45°, 1/4-1/4 45°, 3/8-1/4 45°"
    },
    {
        id: 36,
        imagen: "fotos_organizadas/fotos racores/B100.JPG",
        nombre: "ROSCA INT. NPT",
        categoria: "RACORES",
        medidas: "1/8, 1/4, 3/8, 1/2"
    },
    {
        id: 37,
        imagen: "fotos_organizadas/fotos racores/B101.JPG",
        nombre: "ROSCA INT. NPT / PARA B-21 REBORDE",
        categoria: "RACORES",
        medidas: "1/8 NPT, 1/4 NPT, 3/8 NPT, 1/2 NPT / PARA B21 3/16, PARA B21 3/16 LGO, PARA B21 1/4, PARA B21 10MM, PARA B21 10MM LGO"
    },
    {
        id: 38,
        imagen: "fotos_organizadas/fotos racores/B102A.JPG",
        nombre: "CRUZ ROSCA INTERNA NPT",
        categoria: "RACORES",
        medidas: "1/8 NPT, 1/4 NPT, 3/8 NPT, 1/2 NPT"
    },
    {
        id: 39,
        imagen: "fotos_organizadas/fotos racores/B103.JPG",
        nombre: "UNION ROSCA INT. NPT",
        categoria: "RACORES",
        medidas: "1/8 NPT, 1/4 NPT, 3/8 NPT, 1/2 NPT, 3/4 NPT"
    },
    {
        id: 40,
        imagen: "fotos_organizadas/fotos racores/B109.JPG",
        nombre: "TAPON MACHO NPT / TAPON HEMBRA",
        categoria: "RACORES",
        medidas: "1/8 NPT, 1/4 NPT, 3/8 NPT, 1/2 NPT, 3/4 NPT, 1\" NPT, 1/8 BRISTOL, 1/4 BRISTOL, 3/8 BRISTOL, 1/2 BRISTOL / 1/8 HEMB NPT, 1/4 HEMB NPT, 3/8 HEMB NPT, 1/2 HEMB NPT"
    },
    {
        id: 41,
        imagen: "fotos_organizadas/fotos racores/B110 MACHO SOLDAR.JPG",
        nombre: "RACORES PARA GAS",
        categoria: "RACORES",
        medidas: "1/2 ADAP. MACHO SOLDABLE, 3/4 ADAP. MACHO SOLDABLE"
    },
    {
        id: 42,
        imagen: "fotos_organizadas/fotos racores/B110.JPG",
        nombre: "BUSHING",
        categoria: "RACORES",
        medidas: "1/4-1/8, 3/8-1/8, 3/8-1/4, 1/2-1/8, 1/2-1/4, 1/2-3/8, 3/4-1/8, 3/4-1/4, 3/4-3/8, 3/4-1/2, 1\"-3/4, 22MM P1.5-1/4, 22MM P1.5-3/8, 26MM-1/2"
    },
    {
        id: 43,
        imagen: "fotos_organizadas/fotos racores/B112.JPG",
        nombre: "NIPLE REDONDO",
        categoria: "RACORES",
        medidas: "1/4"
    },
    {
        id: 44,
        imagen: "fotos_organizadas/fotos racores/B113.JPG",
        nombre: "NIPLE REDONDO LARGO",
        categoria: "RACORES",
        medidas: "1/8-1\"1/2, 1/8-2\"1/2, 1/8-3\", 1/4-1\"1/2, 1/4-2\", 1/4-2\"1/2, 1/4-3\", 3/8-1\"1/2, 3/8-2\", 3/8-2\"1/2, 3/8-3\""
    },
    {
        id: 45,
        imagen: "fotos_organizadas/fotos racores/B116.JPG",
        nombre: "CODO CALLE NPT.",
        categoria: "RACORES",
        medidas: "1/8, 1/4, 3/8, 1/2, 1/4-1/8, 1/4-3/8, 3/8-1/4"
    },
    {
        id: 46,
        imagen: "fotos_organizadas/fotos racores/B119 HEMBRA SOLDAR.JPG",
        nombre: "REDUCCION HEMB-HEMB NPT.",
        categoria: "RACORES",
        medidas: "1/8-7/16, 1/4-1/8, 1/4-7/16, 3/8-1/8, 3/8-1/4, 1/2-1/4, 1/2-3/8"
    },
    {
        id: 47,
        imagen: "fotos_organizadas/fotos racores/B119.JPG",
        nombre: "REDUCCION HEMB-HEMB NPT.",
        categoria: "RACORES",
        medidas: "1/8-7/16, 1/4-1/8, 1/4-7/16, 3/8-1/8, 3/8-1/4, 1/2-1/4, 1/2-3/8"
    },
    {
        id: 48,
        imagen: "fotos_organizadas/fotos racores/B122.JPG",
        nombre: "NIPLE HEXAGONO",
        categoria: "RACORES",
        medidas: "1/8-1/8, 1/4-1/8, 1/4-1/4, 3/8-1/8, 3/8-1/4, 3/8-3/8, 1/2-1/4, 1/2-3/8, 1/2-1/2, 3/4-1/2, 3/4-3/4, 1\"-1\""
    },
    {
        id: 49,
        imagen: "fotos_organizadas/fotos racores/B124.JPG",
        nombre: "CODO CALLE 45° NPT",
        categoria: "RACORES",
        medidas: "1/8, 1/4, 3/8, 1/2"
    },
    {
        id: 50,
        imagen: "fotos_organizadas/fotos racores/B127.JPG",
        nombre: "TEE MIXTA NPT",
        categoria: "RACORES",
        medidas: "1/8, 1/4, 3/8, 1/2"
    },
    {
        id: 51,
        imagen: "fotos_organizadas/fotos racores/B158.JPG",
        nombre: "HEMB - MACHO CILIND.",
        categoria: "RACORES",
        medidas: "3/16-3/16, 3/16-1/4, 3/16-7/16, 1/4-5/16, 1/4-7/16, 5/16-1/4, 10MM-12MM, 12MM-10MM"
    },
    {
        id: 52,
        imagen: "fotos_organizadas/fotos racores/B170.JPG",
        nombre: "HEMB CILIND- MACHO REBORDE",
        categoria: "RACORES",
        medidas: "1/4-1/2, 5/16-3/8"
    },
    {
        id: 53,
        imagen: "fotos_organizadas/fotos racores/RAC TEMPERATURA.JPG",
        nombre: "RACOR TEMPERATURA",
        categoria: "RACORES",
        medidas: "3/8-1/4, 3/8-3/8"
    },
    {
        id: 54,
        imagen: "fotos_organizadas/fotos racores/RACOR CHASIS CHEVROLET.JPG",
        nombre: "RACOR CHASIS CHEVROLET",
        categoria: "RACORES",
        medidas: "CHEVROLET"
    },
    {
        id: 55,
        imagen: "fotos_organizadas/fotos racores/RACOR CHASIS CTE.JPG",
        nombre: "RACOR CHASIS CORRIENTE",
        categoria: "RACORES",
        medidas: "CORRIENTE"
    },
    {
        id: 56,
        imagen: "fotos_organizadas/fotos racores/RACOR CHASIS TRAILER.JPG",
        nombre: "RACOR CHASIS TRAILER",
        categoria: "RACORES",
        medidas: "TRAILER"
    },
    {
        id: 57,
        imagen: "fotos_organizadas/fotos racores/RACOR TEMPERATURA  A.JPG",
        nombre: "RACOR TEMPERATURA A",
        categoria: "RACORES",
        medidas: "Consultar medidas disponibles"
    },
    {
        id: 58,
        imagen: "fotos_organizadas/fotos racores/TEE 741.JPG",
        nombre: "TEE DE FRENO",
        categoria: "RACORES",
        medidas: "T-741 10MM X 1, T-741 3/16-15/32-3/8 RF, T-768 3/16-19/32-3/8, T-768 10MM X 1"
    },

    // VÁLVULAS
    {
        id: 59,
        imagen: "fotos_organizadas/fotos racores/VALV DESPEGUE.JPG",
        nombre: "VÁLVULA DE DESPEGUE O ACTIVADORA",
        categoria: "VÁLVULAS",
        medidas: "1/8, 1/4"
    },
    {
        id: 60,
        imagen: "fotos_organizadas/fotos racores/VALV SEGURIDAD CTA.JPG",
        nombre: "VÁLVULA DE SEGURIDAD",
        categoria: "VÁLVULAS",
        medidas: "CORTA 150 LBS"
    },
    {
        id: 61,
        imagen: "fotos_organizadas/fotos racores/VALV SEGURIDAD LGA.JPG",
        nombre: "VÁLVULA DE SEGURIDAD",
        categoria: "VÁLVULAS",
        medidas: "LARGA 200 LBS"
    },
    {
        id: 62,
        imagen: "fotos_organizadas/fotos racores/VALV SEGURIDAD MINI.JPG",
        nombre: "VÁLVULA DE SEGURIDAD",
        categoria: "VÁLVULAS",
        medidas: "MINICORTA 100 LBS"
    },
    {
        id: 63,
        imagen: "fotos_organizadas/fotos racores/VALVULADE RETENCION KN23000.JPG",
        nombre: "VÁLVULAS Y CHEQUES DE AIRE (MAQUINADOS)",
        categoria: "VÁLVULAS",
        medidas: "RETENCIÓN H-M 3/8, RETENCIÓN H-M 1/2 (KN23000), RETENCIÓN H-M 3/4, RETENCIÓN H-M 3/8 CON ALIVIO, RETENCIÓN H-M 1/2 CON ALIVIO, RETENCIÓN H-M 3/4 CON ALIVIO, ADMISION H-H 3/8 (T45115), ADMISION H-H 1/2, ADMISION H-H 3/8 CON ALIVIO, ADMISION H-H 1/2 CON ALIVIO"
    },

    // GRIFOS
    {
        id: 64,
        imagen: "fotos_organizadas/fotos racores/GRIFO 554.JPG",
        nombre: "GRIFOS",
        categoria: "GRIFOS",
        medidas: "554 DRENAJE 1/4, 587 HEMBRA/HEMBRA 1/8"
    },
    {
        id: 65,
        imagen: "fotos_organizadas/fotos racores/GRIFO 588.JPG",
        nombre: "GRIFOS",
        categoria: "GRIFOS",
        medidas: "588 HEMBRA/HEMBRA 1/4"
    },
    {
        id: 66,
        imagen: "fotos_organizadas/fotos racores/GRIFO 592.JPG",
        nombre: "GRIFOS",
        categoria: "GRIFOS",
        medidas: "592 HEMBRA/MACHO 1/4, 594 MACHO/ MACHO 1/4, 554 MARIPOSA 1/4"
    },
    {
        id: 67,
        imagen: "fotos_organizadas/fotos racores/GRIFO RADIADOR.JPG",
        nombre: "GRIFO RADIADOR",
        categoria: "GRIFOS",
        medidas: "1/8, 1/4"
    },

    // ACCESORIOS
    {
        id: 68,
        imagen: "fotos_organizadas/fotos racores/FERRUL.JPG",
        nombre: "FERRULES (PARA GRAFAR MANGUERA)",
        categoria: "ACCESORIOS",
        medidas: "3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4"
    },
    {
        id: 69,
        imagen: "fotos_organizadas/fotos racores/INFLALLANTAS HEMBRA.JPG",
        nombre: "INFLALLANTAS",
        categoria: "ACCESORIOS",
        medidas: "HEMBRA"
    },
    {
        id: 70,
        imagen: "fotos_organizadas/fotos racores/inflallantas mach.JPG",
        nombre: "INFLALLANTAS / MANGUERA INFLALLANTAS",
        categoria: "ACCESORIOS",
        medidas: "MACHO, MACHO EXTRALARGO, BOLA - CAB. INDIO / MANG. INFLALLANTAS 6 MTS, 8 MTS, 10 MTS, 12 MTS, 14 MTS, 15 MTS, 16 MTS, 18 MTS, 20 MTS"
    },
    {
        id: 71,
        imagen: "fotos_organizadas/fotos racores/SANGRADOR.JPG",
        nombre: "SANGRADOR O PURGADOR / SANGRADOR MILIMETRICO",
        categoria: "ACCESORIOS",
        medidas: "1/4, 1/4 LARGO, 5/16 MAZDA / MONZA, 3/8 24 HILOS FORD / DODGE / 7-1 PTA. CONIC. RENAULT/ CHEVROLET LUV, 8-1 PTA. LISA CTO KIA / CHEVETTE / MAZDA, 8-1 PTA. LISA LGO MAZDA / MONZA, 8-1 PTA. CONIC. CTO KIA / MAZDA/ MONZA, 8-1 PTA. CONIC. LGO CHEVETTE/ MAZDA, 8-1.25 CTO FIAT LADA, 8-1.25 LGO DAEWOO / DAIHATSU, 9-1 TOYOTA HI LUX, 10-1 CTO TOYOTA, 10-1 LGO CHEV. SPRING/ TOYOTA, 10-1.25 LGO NISSAN"
    },

    // INSERTOS
    {
        id: 72,
        imagen: "fotos_organizadas/fotos racores/INSERTO BRONCE.JPG",
        nombre: "INSERTOS O REFUERZOS",
        categoria: "INSERTOS",
        medidas: "5/32, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 6MM, 10MM, 12MM"
    },
    {
        id: 73,
        imagen: "fotos_organizadas/fotos racores/INSERTO FOSFORO.JPG",
        nombre: "INSERTOS O REFUERZOS",
        categoria: "INSERTOS",
        medidas: "FOSFORO 3/16, FOSFORO 1/4"
    },
    {
        id: 74,
        imagen: "fotos_organizadas/fotos racores/INSERTO LAMINA.JPG",
        nombre: "FERRULES (PARA GRAFAR MANGUERA)",
        categoria: "INSERTOS",
        medidas: "3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4"
    },

    // MANGUERAS
    {
        id: 75,
        imagen: "fotos_organizadas/fotos racores/MANGUERA SAE J1402.jpg",
        nombre: "JUEGO DE PUNTAS PARA MANGUERA DE GAS / PUNTAS MANGUERA NPR / MANGUERAS ENSAMBLADAS / MANGUERA NPR DELANTERA / MANGUERA INFLALLANTAS / MANGUERA SOPLACABINA / MANGUERA TUBING NYLON X METRO / MANGUERA POLIURETANO X METRO",
        categoria: "MANGUERAS",
        medidas: "Hembra, macho, adaptador 3/8 y 2 ferrules, B2 3/8 HEMBRA MAGUERA GAS, B3 1/2-3/8 MACHO MANGUERA GAS / PTA. HEMBRA MANG. NPR DELANT, ADAPTADOR M16 P1.5-3/8 NPT / MANG. FRENO AIRE 14\", 16\", 18\", 20\", 22\", 24\", 26\", 28\", 30\", 32\", 34\", 36\", 38\", 40\", 42\", 44\", 46\", 48\", 50\", 52\", 54\", 56\", 58\", 60\" / SIN ADAPTADOR CON PROTECTOR EN MANG. TRANSPARENTE / MANG. INFLALLANTAS 6 MTS, 8 MTS, 10 MTS, 12 MTS, 14 MTS, 15 MTS, 16 MTS, 18 MTS, 20 MTS / MANGUERA SYNFLEX 1/8, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 4MM, 6MM, 8MM, 10MM, 12MM, 14MM / MANG POLIURETANO 4MM, 6MM, 8MM, 10MM, 12MM"
    }
];

// Variables globales del catálogo
let productos = [];
let cotizacion = JSON.parse(localStorage.getItem('cotizacion_inrapartes')) || [];
let productosFiltrados = [];
let modoFilas = false;
const CATEGORIAS_OFICIALES = [
    'RACORES',
    'ACOPLES HIDRÁULICOS',
    'ACOPLES PLÁSTICOS',
    'VÁLVULAS Y CHEQUES',
    'MANGUERAS ENSAMBLADAS Y JUEGOS DE PUNTAS PARA MANGUERAS',
    'MANGUERAS IMPORTADAS X METRO Y TUBERÍA DE COBRE FLEXIBLE'
];

// Función para inicializar el catálogo
function normalizarTexto(t) {
    return (t || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function inicializarCatalogo() {
    const fuente = Array.isArray(window.PRODUCTOS_GENERADOS) && window.PRODUCTOS_GENERADOS.length > 0
        ? window.PRODUCTOS_GENERADOS
        : productosCompletos;
    modoFilas = Array.isArray(window.PRODUCTOS_GENERADOS) && window.PRODUCTOS_GENERADOS.length > 0;

    productos = fuente.map(producto => ({
        ...producto,
        codigo: producto.codigo || '',
        material: producto.material || '',
        medidas_array: (() => {
            const prebuilt = Array.isArray(producto.medidas_array) ? producto.medidas_array.filter(Boolean) : [];
            if (prebuilt.length > 0) return prebuilt;
            const raw = (producto.medidas || '').trim();
            if (!raw || raw === 'Consultar medidas disponibles') return [];
            const out = [];
            const regex = /\(([^)]*)\)/g;
            let match;
            while ((match = regex.exec(raw)) !== null) {
                out.push(`(${match[1].trim()})`);
            }
            if (out.length > 0) return out;
            return raw.split(',').map(s => s.trim()).filter(Boolean);
        })()
    }));
    
    productosFiltrados = [...productos];
    renderizarProductos();
    actualizarContadorCotizacion();
    actualizarSidebarCotizacion(); // Actualizar sidebar con datos de localStorage
    configurarFiltros();
    cargarParametrosURL();
}

// Función para renderizar productos en el grid
function renderizarProductos() {
    const grid = document.getElementById('productsGrid');
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (!grid) return;

    if (productosFiltrados.length === 0) {
        grid.innerHTML = '';
        if (noProductsMessage) noProductsMessage.style.display = 'block';
        return;
    }
    if (noProductsMessage) noProductsMessage.style.display = 'none';

    if (!modoFilas) {
        grid.style.display = 'grid';
        grid.innerHTML = productosFiltrados.map(producto => crearTarjetaProducto(producto)).join('');
        setupImageLoading(grid);
        return;
    }

    // Modo filas horizontales por categoría (6 filas máximas)
    grid.style.display = 'block';
    const grupos = agruparPorCategoria(productosFiltrados);
    const filasHTML = CATEGORIAS_OFICIALES
        .filter(cat => grupos[cat] && grupos[cat].length)
        .map(cat => crearFilaCategoria(cat, grupos[cat]))
        .join('');
    grid.innerHTML = filasHTML || '<p style="color:#FFFEF8;text-align:center;">No hay productos para mostrar.</p>';
    setupImageLoading(grid);
    inicializarNavegacionFilas();
}

function agruparPorCategoria(lista) {
    return lista.reduce((acc, p) => {
        const cat = p.categoria || 'RACORES';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(p);
        return acc;
    }, {});
}

function crearFilaCategoria(categoria, items) {
    const track = items.map(crearTarjetaProducto).join('');
    return `
    <section class="category-row" data-category="${categoria}">
        <div class="category-row-header">
            <h2>${categoria}</h2>
            <div class="row-controls">
                <button class="row-nav-btn prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
                <button class="row-nav-btn next" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
        <div class="category-row-viewport">
            <div class="category-row-track">
                ${track}
            </div>
        </div>
    </section>`;
}

function inicializarNavegacionFilas() {
    document.querySelectorAll('.category-row').forEach(row => {
        const viewport = row.querySelector('.category-row-viewport');
        const prev = row.querySelector('.row-nav-btn.prev');
        const next = row.querySelector('.row-nav-btn.next');
        const scrollBy = () => Math.max(viewport.clientWidth * 0.9, 300);
        if (prev) prev.addEventListener('click', () => viewport.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
        if (next) next.addEventListener('click', () => viewport.scrollBy({ left: scrollBy(), behavior: 'smooth' }));
    });
}

// Función para crear la tarjeta de producto
function crearTarjetaProducto(producto) {
    const tienemedidas = producto.medidas_array.length > 0;
    let materialHtml = '';
    // Utilidad: escapar valores para atributos HTML
    const escapeAttr = (s) => String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    // Normaliza y codifica por segmentos (maneja espacios y acentos en móviles / servidores Linux)
    const encodePathSegments = (p) => {
        if (!p) return '';
        // Evita doble encoding: decodifica primero cualquier % existente seguro
        try { p = decodeURI(p); } catch(e) { /* noop */ }
        return p.split('/').map(seg => encodeURIComponent(seg).replace(/%25/g,'%')).join('/');
    };
    if (producto.material) {
        let opciones = [];
        const rawMat = (producto.material || '').trim();
        if (rawMat.toUpperCase() === 'N/A') {
            opciones = [rawMat];
        } else if (rawMat.includes('/')) {
            // Lógica robusta: dividir solo por / fuera de paréntesis
            opciones = splitMaterialOpciones(rawMat);
        } else {
            opciones = [rawMat];
        }
        materialHtml = `<div class="product-material"><strong>Material:</strong> <div class="material-options" data-product-id="${producto.id}">
            ${opciones.map((op, idx) => `
                <span class="material-option${idx === 0 ? ' selected' : ''}" data-material="${escapeAttr(op)}" onclick="seleccionarMaterial(${producto.id}, this)">${op}</span>
            `).join('')}
        </div></div>`;
    }

// --- Función robusta para dividir opciones de material ---
function splitMaterialOpciones(materialStr) {
    // Divide solo por / que estén fuera de paréntesis
    let opciones = [];
    let actual = '';
    let nivelParentesis = 0;
    for (let i = 0; i < materialStr.length; i++) {
        const c = materialStr[i];
        if (c === '(') nivelParentesis++;
        if (c === ')') nivelParentesis = Math.max(0, nivelParentesis - 1);
        if (c === '/' && nivelParentesis === 0) {
            if (actual.trim()) opciones.push(actual.trim());
            actual = '';
        } else {
            actual += c;
        }
    }
    if (actual.trim()) opciones.push(actual.trim());
    return opciones;
}
// --- Detección de materiales sospechosos con / y paréntesis ---
function reportarMaterialesSospechosos() {
    const productos = window.PRODUCTOS_GENERADOS || [];
    productos.forEach(p => {
        const mat = (p.material || '').trim();
        if (
            mat &&
            mat.includes('/') &&
            /[()]/.test(mat) &&
            /\//.test(mat) &&
            splitMaterialOpciones(mat).length < 2 // Si la lógica robusta no detecta varias opciones
        ) {
            console.warn('[ALERTA MATERIAL]', {
                codigo: p.codigo,
                nombre: p.nombre,
                material: mat,
                sugerencia: 'Revisar: posible / dentro de paréntesis o formato especial. Puede requerir ajuste manual.'
            });
        }
    });
}

// Ejecutar el reporte una vez al cargar el catálogo
if (typeof window !== 'undefined' && window.PRODUCTOS_GENERADOS) {
    setTimeout(reportarMaterialesSospechosos, 1000);
}
    // Identificadores de medidas especiales para GRIFOS
    const medidasImagenesGrifo = {
        'GRIFO 588 HEMBRA/HEMBRA 1/4': 'fotos_organizadas/fotos racores/GRIFO 588.JPG',
        'GRIFO 592': 'fotos_organizadas/fotos racores/GRIFO 592.JPG'
    };
    // Si es GRIFOS, renderiza con imagen dinámica
    let imagenHtml;
    // Placeholder transparente 1x1 (para evitar solicitudes prematuras) & atributos de rendimiento
    const transparentPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    // Se codifica data-src para evitar fallos por acentos (ej: VÁLVULAS Y CHEQUES) en hosting Linux
    const encodedImg = encodePathSegments(producto.imagen);
    // Volvemos a un modo híbrido: placeholder + lazy controlado por cola para fluidez.
    const baseImgAttrs = `src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" data-src="${escapeAttr(encodedImg)}" alt="${escapeAttr(producto.nombre)}" class="product-image lazy not-loaded" loading="lazy" decoding="async" width="400" height="200" onerror="window.__handleImgError && window.__handleImgError(this);"`;
    if (producto.categoria === 'GRIFOS') {
        imagenHtml = `<img id="img-producto-${producto.id}" ${baseImgAttrs}>`;
    } else {
        imagenHtml = `<img ${baseImgAttrs}>`;
    }
    // Verificar si hay alguna medida seleccionada para habilitar el botón
    let checked = false;
    if (window.cotizacion && Array.isArray(window.cotizacion)) {
        checked = window.cotizacion.some(item => item.productId === producto.id);
    }
    return `
        <div class="product-card" data-product-id="${producto.id}">
            <div class="product-image-container">
                ${imagenHtml}
            </div>
            <div class="product-content">
                ${producto.codigo ? `<div class="product-code"><strong>Código:</strong> ${producto.codigo}</div>` : ''}
                <h3 class="product-title">${escapeAttr(producto.nombre)}</h3>
                ${materialHtml}
                ${tienemedidas ? crearSeccionMedidas(producto) : crearSeccionConsulta(producto)}
                <div class="product-category-line" style="margin-top:8px; color:#6c757d; font-size:12px;"><strong>Categoría:</strong> ${producto.categoria || ''}</div>
                <button class="quote-button" onclick="manejarAgregarACotizacion(${producto.id})" ${tienemedidas && !checked ? 'disabled' : ''}>
                    <i class="fas fa-clipboard-list"></i>
                    ${tienemedidas ? 'Selecciona medidas' : 'Agregar a Cotización'}
                </button>
            </div>
        </div>
    `;
}

// Lógica para seleccionar material (solo uno por producto)
window.seleccionarMaterial = function(productId, el) {
    const options = document.querySelectorAll(`.material-options[data-product-id="${productId}"] .material-option`);
    options.forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
}

// Función para crear la sección de medidas
function crearSeccionMedidas(producto) {
    const escapeAttr = (s) => String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return `
        <div class="measures-section">
            <label class="measures-label">Medidas disponibles:</label>
            <div class="measures-list">
                ${producto.medidas_array.map(medida => `
                    <div class="measure-item">
                        <label class="measure-checkbox">
                            <input type='checkbox' value="${escapeAttr(medida)}" onchange='toggleMedida(${producto.id}, ${JSON.stringify(medida)}, this)'>
                            <span class="measure-name">${escapeAttr(medida.replace(/^\(|\)$/g, ''))}</span>
                        </label>
                        <input type="number" class="quantity-input" min="1" value="1" 
                               data-product="${producto.id}" data-measure="${escapeAttr(medida)}" style="display: none;">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Función para crear la sección de consulta
function crearSeccionConsulta(producto) {
    return `
        <div class="measures-section">
            <p style="color: #7d7d7e; font-style: italic; margin: 10px 0;">Medidas disponibles bajo consulta</p>
            <div class="quantity-section" style="display: flex; align-items: center; gap: 10px; margin: 10px 0;">
                <label style="color: #303030; font-weight: 600;">Cantidad:</label>
                <input type="number" class="quantity-input" min="1" value="1" 
                       data-product="${producto.id}" data-measure="consulta">
            </div>
        </div>
    `;
}

// Función para toggle de medidas
function toggleMedida(productId, medida, checkbox) {
    const quantityInput = checkbox.closest('.measure-item')?.querySelector('.quantity-input') || checkbox.closest('.product-measures')?.querySelector('.quantity-input');
    const card = checkbox.closest('.product-card');
    const quoteButton = card ? card.querySelector('.quote-button') : null;
    // Mostrar/ocultar input cantidad
    if (checkbox.checked) {
        if (quantityInput) quantityInput.style.display = 'inline-block';
    } else {
        if (quantityInput) quantityInput.style.display = 'none';
        if (quantityInput) quantityInput.value = 1;
    }
    // Imagen dinámica para GRIFOS
    const producto = window.productos?.find(p => p.id === productId);
    if (producto && producto.categoria === 'GRIFOS') {
        const imgEl = document.getElementById(`img-producto-${productId}`);
        if (medida.trim().toUpperCase() === 'GRIFO 588 HEMBRA/HEMBRA 1/4' && checkbox.checked) {
            imgEl && (imgEl.src = 'fotos_organizadas/fotos racores/GRIFO 588.JPG');
        } else if (medida.trim().toUpperCase() === 'GRIFO 592' && checkbox.checked) {
            imgEl && (imgEl.src = 'fotos_organizadas/fotos racores/GRIFO 592.JPG');
        } else {
            const checkedBoxes = card ? card.querySelectorAll('input[type="checkbox"]:checked') : [];
            const algunaEspecial = Array.from(checkedBoxes).some(cb => {
                const val = cb.value.trim().toUpperCase();
                return val === 'GRIFO 588 HEMBRA/HEMBRA 1/4' || val === 'GRIFO 592';
            });
            if (!algunaEspecial) {
                imgEl && (imgEl.src = 'fotos_organizadas/fotos racores/GRIFO 554.JPG');
            }
        }
    }
    // Actualizar estado del botón SIEMPRE según los checkboxes marcados en la tarjeta
    const checkedBoxes = card ? card.querySelectorAll('input[type="checkbox"]:checked') : [];
    if (quoteButton) {
        if (checkedBoxes.length > 0) {
            quoteButton.disabled = false;
            quoteButton.innerHTML = '<i class="fas fa-clipboard-list"></i> Agregar a Cotización';
        } else {
            quoteButton.disabled = true;
            quoteButton.innerHTML = '<i class="fas fa-clipboard-list"></i> Selecciona medidas';
        }
    }
}

// Función para manejar agregar a cotización
function manejarAgregarACotizacion(productId) {
    const producto = productos.find(p => p.id === productId);
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (producto.medidas_array.length > 0) {
        agregarProductoConMedidas(producto, productCard);
    } else {
        agregarProductoConsulta(producto, productCard);
    }
    
    localStorage.setItem('cotizacion_inrapartes', JSON.stringify(cotizacion));
    actualizarContadorCotizacion();
    mostrarNotificacionAgregado(producto.nombre);
    // Actualizar el sidebar si está visible
    actualizarSidebarCotizacion();
}

// Función para agregar producto con medidas específicas
function agregarProductoConMedidas(producto, productCard) {
    const checkedBoxes = productCard.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkedBoxes.length === 0) {
        mostrarAlerta('Por favor selecciona al menos una medida.');
        return;
    }
    
    checkedBoxes.forEach(checkbox => {
        const medida = checkbox.value;
        const quantityInput = checkbox.closest('.measure-item').querySelector('.quantity-input');
        const cantidad = parseInt(quantityInput.value) || 1;
        
        agregarItemACotizacion(producto, medida, cantidad);
        
        // Limpiar selección
        checkbox.checked = false;
        toggleMedida(producto.id, medida, checkbox);
    });
}

// Función para agregar producto de consulta
function agregarProductoConsulta(producto, productCard) {
    const quantityInput = productCard.querySelector('.quantity-input');
    const cantidad = parseInt(quantityInput.value) || 1;
    
    agregarItemACotizacion(producto, 'Consultar medidas disponibles', cantidad);
}

// Función para agregar item a cotización
function agregarItemACotizacion(producto, medida, cantidad) {
    const itemId = `${producto.id}-${medida.replace(/[^a-zA-Z0-9]/g, '_')}`;
    // Captura el material seleccionado (si hay selector)
    let materialSeleccionado = producto.material;
    const card = document.querySelector(`[data-product-id="${producto.id}"]`);
    if (card) {
        const selectedMaterial = card.querySelector('.material-option.selected');
        if (selectedMaterial) {
            materialSeleccionado = selectedMaterial.getAttribute('data-material');
        }
    }
    const existingIndex = cotizacion.findIndex(item => item.id === itemId);
    if (existingIndex >= 0) {
        cotizacion[existingIndex].cantidad += cantidad;
        cotizacion[existingIndex].material = materialSeleccionado;
    } else {
        cotizacion.push({
            id: itemId,
            productId: producto.id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            medida: medida,
            cantidad: cantidad,
            imagen: producto.imagen,
            material: materialSeleccionado
        });
    }
}

// Función para mostrar notificación
function mostrarNotificacionAgregado(nombreProducto) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #fed300 0%, #303030 100%);
        color: #FFFEF8;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(254, 211, 0, 0.3);
        z-index: 9999;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="color: #FFFEF8;"></i>
        <span>${nombreProducto} agregado a tu cotización</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Función para actualizar contador de cotización
function actualizarContadorCotizacion() {
    const contador = document.getElementById('cartCount');
    if (!contador) return;
    
    const totalItems = cotizacion.reduce((sum, item) => sum + item.cantidad, 0);
    const previousCount = parseInt(contador.textContent) || 0;
    
    contador.textContent = totalItems;
    
    if (totalItems > 0) {
        contador.style.display = 'flex';
        
        // Activar animación bounce si se agregó un producto
        if (totalItems > previousCount) {
            contador.style.animation = 'none';
            setTimeout(() => {
                contador.style.animation = 'bounce 0.5s ease';
            }, 10);
        }
    } else {
        contador.style.display = 'none';
    }
}

// Función para configurar filtros
function configurarFiltros() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    if (categoryFilter) categoryFilter.addEventListener('change', aplicarFiltros);
    if (searchInput) searchInput.addEventListener('input', aplicarFiltros);
}

// Función para aplicar filtros
function aplicarFiltros() {
    const categoryValue = document.getElementById('categoryFilter')?.value || '';
    const searchValue = normalizarTexto(document.getElementById('searchInput')?.value || '');
    productosFiltrados = productos.filter(producto => {
        const matchCategory = !categoryValue || normalizarTexto(producto.categoria) === normalizarTexto(categoryValue);
        const blob = [producto.codigo, producto.nombre, producto.material, producto.medidas, producto.categoria]
            .map(normalizarTexto)
            .join(' | ');
        const matchSearch = !searchValue || blob.includes(searchValue);
        return matchCategory && matchSearch;
    });
    
    renderizarProductos();
}

// Función para cargar parámetros de URL
function cargarParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    const search = urlParams.get('search');
    
    if (categoria) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) categoryFilter.value = categoria;
    }
    
    if (search) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = search;
    }
    
    if (categoria || search) {
        aplicarFiltros();
    }
}

// Función para mostrar alerta personalizada
function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFFEF8;
        color: #303030;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        border: 2px solid #fed300;
        font-weight: 600;
        text-align: center;
        min-width: 300px;
    `;
    alerta.innerHTML = `
        <div style="margin-bottom: 15px;">
            <i class="fas fa-exclamation-triangle" style="color: #fed300; font-size: 24px;"></i>
        </div>
        <p style="margin: 0 0 15px 0;">${mensaje}</p>
        <button onclick="this.parentElement.remove()" style="
            background: #fed300;
            color: #303030;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
        ">Entendido</button>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        if (alerta.parentElement) alerta.remove();
    }, 5000);
}

// Función para mostrar/ocultar sidebar de cotización
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const opening = !sidebar.classList.contains('active');
    sidebar.classList.toggle('active');
    // Si se está abriendo, renderizar el contenido más reciente
    if (opening) {
        actualizarSidebarCotizacion();
    }
}

// Función para actualizar sidebar de cotización
function actualizarSidebarCotizacion() {
    const content = document.getElementById('cartContent');
    
    if (!content) {
        console.error('No se encontró el elemento cartContent');
        return;
    }
    
    if (cotizacion.length === 0) {
        content.innerHTML = `
            <p style="text-align: center; color: #6c757d; margin: 40px 0;">
                <i class="fas fa-clipboard-plus" style="font-size: 32px; display: block; margin-bottom: 10px;"></i>
                Tu cotización está vacía
            </p>
        `;
        return;
    }
    
    content.innerHTML = `
        <div class="cart-items">
            ${cotizacion.map(item => `
                <div class="cart-item">
                    <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image" onerror="this.style.display='none'">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-measure">Medida: ${item.medida}</div>
                        <div class="cart-item-quantity">Cantidad: ${item.cantidad}</div>
                    </div>
                    <button class="cart-item-remove" onclick="eliminarDeCotizacion('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="cart-actions">
            <div class="cart-total">
                Total de productos: ${cotizacion.length}
            </div>
            <button class="send-quote-btn" onclick="abrirModalCotizacion()">
                <i class="fas fa-paper-plane"></i>
                Enviar Cotización
            </button>
        </div>
    `;
}

// Función para eliminar producto de cotización
function eliminarDeCotizacion(itemId) {
    cotizacion = cotizacion.filter(item => item.id !== itemId);
    localStorage.setItem('cotizacion_inrapartes', JSON.stringify(cotizacion));
    actualizarContadorCotizacion();
    actualizarSidebarCotizacion();
}

// Función para abrir modal de cotización
function abrirModalCotizacion() {
    if (cotizacion.length === 0) {
        mostrarAlerta('Tu cotización está vacía');
        return;
    }
    
    document.getElementById('quoteModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Función para cerrar modal de cotización
function closeQuoteModal() {
    document.getElementById('quoteModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Función para enviar cotización por email
function sendQuoteEmail() {
    const nombre = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const telefono = document.getElementById('clientPhone').value;
    const empresa = document.getElementById('clientCompany').value;
    
    if (!nombre || !email) {
        alert('Por favor completa los campos obligatorios (Nombre y Email)');
        return;
    }
    
    // Generar tabla HTML de productos
    const productosTabla = cotizacion.map((item, index) => {
        const mat = item.material || 'N/A';
        return `
        <tr style="border-bottom: 1px solid #eee; background: ${index % 2 === 0 ? '#fff' : '#f8f9fa'};">
            <td style="padding: 12px; border-right: 1px solid #eee; text-align: center; font-weight: bold; color: #303030;">${index + 1}</td>
            <td style="padding: 12px; border-right: 1px solid #eee; font-weight: 600; color: #303030;">${item.nombre}</td>
            <td style="padding: 12px; border-right: 1px solid #eee; text-align: center; color: #6c757d; font-size: 13px;">${item.categoria}</td>
            <td style="padding: 12px; border-right: 1px solid #eee; text-align: center; color: #495057; font-weight: 500;">${item.medida}</td>
            <td style="padding: 12px; border-right: 1px solid #eee; text-align: center; color: #303030; font-weight: 500;">${mat}</td>
            <td style="padding: 12px; text-align: center; font-weight: bold; color: #fed300; background: #303030; border-radius: 4px;">${item.cantidad}</td>
        </tr>`;
    }).join('');
    
    const totalCantidad = cotizacion.reduce((sum, item) => sum + item.cantidad, 0);
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const horaFormateada = fechaActual.toLocaleTimeString('es-CO');
    
    const templateParams = {
        from_name: nombre,
        from_email: email,
        phone: telefono || 'No proporcionado',
        company: empresa || 'No proporcionado',
        products_table: productosTabla,
        total_items: cotizacion.length,
        total_quantity: totalCantidad,
        date: fechaFormateada,
        time: horaFormateada
    };
    
    // Deshabilitar botón mientras se envía
    const sendBtn = document.querySelector('.btn-primary');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    emailjs.send('service_ypr3hwl', 'template_cotizacion', templateParams)
        .then(function(response) {
            alert('¡Cotización enviada exitosamente! Te contactaremos pronto.');
            closeQuoteModal();
            cotizacion = [];
            localStorage.setItem('cotizacion_inrapartes', JSON.stringify(cotizacion));
            actualizarContadorCotizacion();
            actualizarSidebarCotizacion();
            
            // Cerrar sidebar
            const sidebar = document.getElementById('cartSidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
            
            // Limpiar formulario
            document.getElementById('quoteForm').reset();
        })
        .catch(function(error) {
            console.error('Error al enviar:', error);
            alert('Error al enviar la cotización. Por favor intenta nuevamente.');
        })
        .finally(function() {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Cotización';
        });
}

// Exportar funciones globalmente
window.inicializarCatalogo = inicializarCatalogo;
window.toggleMedida = toggleMedida;
window.manejarAgregarACotizacion = manejarAgregarACotizacion;
window.toggleCart = toggleCart;
window.eliminarDeCotizacion = eliminarDeCotizacion;
window.abrirModalCotizacion = abrirModalCotizacion;
window.closeQuoteModal = closeQuoteModal;
window.sendQuoteEmail = sendQuoteEmail; 

// Carga de imágenes priorizada: visibles primero, luego lazy-load
function setupImageLoading(container) {
    const images = Array.from(container.querySelectorAll('img.product-image'));
    if (images.length === 0) return;

    // Asegurar que todas tengan data-src adecuado
    images.forEach(img => { if (!img.dataset.src) img.dataset.src = img.getAttribute('data-src') || img.src; });

    // Añadir CSS para shimmer/fade-in una sola vez
    if (!window.__catalogImagePerfCssAdded) {
        const css = `/* Optimización carga imágenes catálogo */\n.product-image.not-loaded {\n  background: linear-gradient(90deg,#f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);\n  background-size:400% 100%;\n  animation: catalog-shimmer 1.1s ease-in-out infinite;\n  filter: blur(8px);\n  transition: filter .4s ease, opacity .4s ease;\n  opacity:.6;\n}\n@keyframes catalog-shimmer {\n  0% { background-position: 100% 0; }\n  100% { background-position: -100% 0; }\n}\n.product-image.fade-in {\n  animation: catalog-fade-in .55s ease forwards;\n}\n@keyframes catalog-fade-in {\n  from { opacity:0; } to { opacity:1; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .product-image.not-loaded { animation:none; }\n  .product-image.fade-in { animation:none; opacity:1; }\n}`;
        const styleEl = document.createElement('style');
        styleEl.id = 'catalog-image-perf-css';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
        window.__catalogImagePerfCssAdded = true;
    }

    // Primeras 8 se marcan prioridad para percepción rápida
    images.slice(0,8).forEach(img => img.setAttribute('fetchpriority','high'));

    const onRealLoad = (img) => {
        img.classList.remove('not-loaded');
        img.classList.add('fade-in');
        // Compresión ligera opcional al vuelo (solo si > 250KB y es jpg/png) para reducir peso luego.
        if (!img.__compressed && window.__enableRuntimeCompress) {
            try {
                fetch(img.src).then(r => r.blob()).then(b => {
                    if (b.size > 250*1024 && /image\/(jpeg|png)/.test(b.type)) {
                        const fr = new FileReader();
                        fr.onload = () => {
                            const i2 = new Image();
                            i2.onload = () => {
                                const cvs = document.createElement('canvas');
                                cvs.width = i2.naturalWidth; cvs.height = i2.naturalHeight;
                                const ctx = cvs.getContext('2d');
                                ctx.drawImage(i2,0,0);
                                const q = b.type === 'image/png' ? 0.82 : 0.76; // ligera reducción
                                const dataURL = cvs.toDataURL('image/jpeg', q);
                                if (dataURL && dataURL.length < b.size * 1.1) { // sólo si vale la pena
                                    img.src = dataURL; // reemplazo en memoria
                                    img.__compressed = true;
                                }
                            };
                            i2.src = fr.result;
                        };
                        fr.readAsDataURL(b);
                    }
                }).catch(()=>{});
            } catch(e) { /* silencioso */ }
        }
    };

    // Cola de carga limitada para evitar picos de ancho de banda y jank
    const queue = [];
    const MAX_CONCURRENT = 4;
    let inFlight = 0;
    function processQueue() {
        while (inFlight < MAX_CONCURRENT && queue.length) {
            const img = queue.shift();
            if (!img.dataset || !img.dataset.src) continue;
            inFlight++;
            const done = () => { inFlight = Math.max(0,inFlight-1); processQueue(); };
            if (!img.__perfListenerAdded) {
                img.addEventListener('load', () => { onRealLoad(img); done(); }, { once: true });
                img.addEventListener('error', () => { done(); }, { once: true });
                img.__perfListenerAdded = true;
            }
            // Asignar src real
            if (img.src !== img.dataset.src) img.src = img.dataset.src;
            // Si ya cached
            if (img.complete && img.naturalWidth) { onRealLoad(img); done(); }
        }
    }

    // IntersectionObserver para encolar sólo visibles + prefetch anticipado
    const rootMargin = '300px';
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    observer.unobserve(img);
                    if (!img.__queued) { queue.push(img); img.__queued = true; processQueue(); }
                }
            });
        }, { root: null, rootMargin, threshold: 0.01 });
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback: encolar todas
        images.forEach(img => { if (!img.__queued){ queue.push(img); img.__queued=true; } });
        processQueue();
    }

    // Prefetch silencioso de las siguientes rutas cuando liberamos ancho de banda
    let prefetchIndex = 0;
    function prefetchNextBatch() {
        if (inFlight > 0) { requestIdleCallback(prefetchNextBatch, {timeout:1500}); return; }
        const batch = images.slice(prefetchIndex, prefetchIndex + 6).filter(i => !i.__prefetched && !i.__queued);
        batch.forEach(i => {
            i.__prefetched = true;
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = i.dataset.src;
            document.head.appendChild(link);
        });
        prefetchIndex += 6;
        if (prefetchIndex < images.length) requestIdleCallback(prefetchNextBatch, {timeout:3000});
    }
    if ('requestIdleCallback' in window) requestIdleCallback(prefetchNextBatch, {timeout:2000});
}

// Manejador global de errores de imagen: intenta variaciones de extensión y codificación antes de usar placeholder final
if (typeof window !== 'undefined' && !window.__handleImgError) {
    window.__handleImgError = function(img) {
        if (!img || img.__imgErrorHandledFinal) return;
        const original = img.dataset.originalPath || img.dataset.src || img.src || '';
        if (!img.dataset.originalPath) img.dataset.originalPath = original;
        const attempts = img.__attempts || [];
        if (attempts.length === 0) {
            // Generar lista de intentos (cambiar extensión/case)
            const parts = original.split('?')[0].split('#')[0];
            const dot = parts.lastIndexOf('.');
            const base = dot !== -1 ? parts.slice(0, dot) : parts;
            const ext = dot !== -1 ? parts.slice(dot + 1) : '';
            const variants = ['png','PNG','jpg','JPG','jpeg','JPEG'];
            variants.forEach(v => { if (v !== ext) attempts.push(base + '.' + v); });
            img.__attempts = attempts;
        }
        // Consumir siguiente intento
        if (attempts.length > 0) {
            const next = attempts.shift();
            try { img.src = next; return; } catch(e) { /* continúa */ }
        }
        // Intento final: placeholder remoto ligero
        img.__imgErrorHandledFinal = true;
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="16">Imagen no disponible</text></svg>';
        img.classList.remove('not-loaded');
    };
}