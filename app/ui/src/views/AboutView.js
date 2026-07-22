import { defineComponent, computed } from "vue";
/**
 * Vista informativa del Negocio con opciones de contacto directo y canales de redes sociales.
 */
export default defineComponent({
    name: "AboutView",
    setup() {
        // Número telefónico corporativo para soporte por WhatsApp (formato internacional sin signos)
        const whatsappPhoneNumber = "+51952075851";
        // Mensaje predeterminado al iniciar la conversación por WhatsApp
        const defaultMessage = "¡Hola! Quisiera obtener información sobre el servicio de remesas y las tasas actuales.";
        // Enlaces de redes sociales oficiales
        const socialLinks = {
            whatsappChannel: "https://whatsapp.com/channel/0029VbC434jE50UeGA9jhB1l",
            instagram: "https://www.instagram.com/tusremesasyave?utm_source=qr&igsh=Y3czc29sYnoycjVl",
            tiktok: "https://tiktok.com/@andres.remesas",
        };
        /**
         * Construye la URL estructurada para la API directa de WhatsApp.
         *
         * Returns:
         *     string: URL formateada con teléfono y mensaje codificado.
         */
        const whatsappContactUrl = computed(() => {
            const encodedMessage = encodeURIComponent(defaultMessage);
            return `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
        });
        return {
            socialLinks,
            whatsappContactUrl,
        };
    },
});
