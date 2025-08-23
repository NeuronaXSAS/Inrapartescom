# 🚀 CONFIGURACIÓN EMAILJS - 30 SEGUNDOS

## ✅ **PASOS RÁPIDOS:**

### 1. **Registro en EmailJS (30 segundos)**
1. Ve a: https://www.emailjs.com/
2. Clic en "Sign Up" - usar email personal
3. Verificar email (revisar spam)

### 2. **Crear Servicio (30 segundos)**
1. En Dashboard → "Add New Service"
2. Seleccionar "Gmail" (más fácil)
3. Conectar tu Gmail personal
4. **Service ID:** `service_inrapartes` ⚠️ **USAR EXACTO**

### 3. **Crear Template (1 minuto)**
1. En Dashboard → "Email Templates" → "Create New Template"
2. **Template ID:** `template_cotizacion` ⚠️ **USAR EXACTO**
3. Copiar este contenido:

**Subject:** `Nueva Cotización - {{from_name}} - INRAPARTES`

**Content:**
```
⚠️ IMPORTANTE: Usar el template HTML del archivo template_email_inrapartes.html 

VARIABLES REQUERIDAS:
- from_name: Nombre del cliente
- from_email: Email del cliente  
- phone: Teléfono del cliente
- company: Empresa del cliente
- products_table: Tabla HTML con productos
- total_items: Número total de productos
- total_quantity: Cantidad total de unidades
- date: Fecha formateada
- time: Hora formateada

El nuevo template incluye:
✅ Branding corporativo INRAPARTES
✅ Tabla organizada de productos
✅ Diseño responsive y profesional
```

### 4. **Obtener Public Key**
1. En Dashboard → "Account" → "General"
2. Copiar "Public Key"
3. **Reemplazar en catalogo.html línea 749:**
   ```javascript
   emailjs.init("TU_PUBLIC_KEY_AQUI"); // Cambiar esta línea
   ```

## 🎯 **¡LISTO EN 2 MINUTOS!**

- **Service ID:** `service_inrapartes`
- **Template ID:** `template_cotizacion`
- **Public Key:** Copiar de tu cuenta

**¡El catálogo enviará emails automáticamente!** 📧✅ 