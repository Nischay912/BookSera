// Importing StyleSheet from React Native.
// StyleSheet helps us write CSS-like styles in React Native in an optimized way.
import { StyleSheet } from "react-native";

// Importing our COLORS file which contains all the app's color variables.
// Instead of writing colors manually everywhere, we store them in COLORS for consistency.
import COLORS from "../../constants/colors";

// Creating a StyleSheet object that contains all our UI styles.
// StyleSheet.create() also validates and optimizes the styles internally.
const styles = StyleSheet.create({

  // MAIN SCREEN CONTAINER
  container: {
    flexGrow: 1,                     // Allows the screen content to expand vertically 
                                     // and enables scroll if content is tall.
    backgroundColor: COLORS.background, // Sets background color of the full screen.
    padding: 20,                     // Adds space around all sides inside the screen.
    justifyContent: "center",        // Vertically centers inner content when screen is empty or small.
  },

  // CARD THAT HOLDS THE FORM
  card: {
    backgroundColor: COLORS.cardBackground, // Light-colored card background.
    borderRadius: 16,                // Makes card corners rounded.
    padding: 24,                     // Inner spacing inside the card.
    shadowColor: COLORS.black,       // Shadow color for iOS.
    shadowOffset: { width: 0, height: 2 }, // Shadow position (downwards).
    shadowOpacity: 0.1,              // How dark/light the shadow is.
    shadowRadius: 8,                 // How soft/blurred the shadow edges are.
    elevation: 4,                    // Android shadow intensity.
    borderWidth: 2,                  // Thick outline around card.
    borderColor: COLORS.border,      // Border color.
  },

  // HEADER SECTION ABOVE THE FORM (title + subtitle)
  header: {
    alignItems: "center",            // Centers header text horizontally.
    marginBottom: 32,                // Space between header and form.
  },

  // BIG MAIN TITLE (e.g., "SIGN UP" or "LOGIN")
  title: {
    fontSize: 32,                    // Large, bold title text.
    fontWeight: "700",               // Thick bold style for emphasis.
    fontFamily: "JetBrainsMono-Medium", // Custom font for stylish look.
    color: COLORS.primary,           // Uses primary color from theme.
    marginBottom: 8,                 // Space between title and subtitle.
  },

  // SUBTITLE UNDER THE TITLE
  subtitle: {
    fontSize: 16,                    // Medium-size text.
    color: COLORS.textSecondary,     // Greyish color for less important info.
    textAlign: "center",             // Centers subtitle text.
  },

  // FORM CONTAINER (holds all input groups)
  formContainer: {
    marginBottom: 16,                // Space at the bottom after all inputs.
  },

  // EACH INPUT + LABEL GROUP
  inputGroup: {
    marginBottom: 20,                // Space after each form field.
  },

  // LABEL TEXT ABOVE EACH INPUT FIELD
  label: {
    fontSize: 14,                    // Small readable text size.
    marginBottom: 8,                 // Space between label and input box.
    color: COLORS.textPrimary,       // Dark primary text color.
    fontWeight: "500",               // Medium bold weight.
  },

  // INPUT BOX WRAPPER (contains input icon + text input + eye icon)
  inputContainer: {
    flexDirection: "row",            // Places items horizontally.
    alignItems: "center",            // Vertically centers the input and icons.
    backgroundColor: COLORS.inputBackground, // Light background for input field.
    borderRadius: 12,                // Smooth rounded corners.
    borderWidth: 1,                  // Thin border around input.
    borderColor: COLORS.border,      // Border color.
    paddingHorizontal: 12,           // Left & right internal spacing.
  },

  // LEFT-SIDE ICON INSIDE INPUT BOX
  inputIcon: {
    marginRight: 10,                 // Space between icon and text input.
  },

  // ACTUAL TEXT INPUT FIELD WHERE USER TYPES
  input: {
    flex: 1,                         // Input expands to fill the remaining width.
    height: 48,                      // Standard text input height.
    color: COLORS.textDark,          // Text color inside input box.
  },

  // EYE ICON (for password show/hide)
  eyeIcon: {
    padding: 8,                      // Increases touchable area.
  },

  // MAIN BUTTON (LOGIN / SIGNUP BUTTON)
  button: {
    backgroundColor: COLORS.primary, // Main brand color.
    borderRadius: 12,                // Makes button corners rounded.
    height: 50,                      // Fixed height for consistent buttons.
    justifyContent: "center",        // Centers text vertically.
    alignItems: "center",            // Centers text horizontally.
    marginTop: 16,                   // Space above button.
    shadowColor: COLORS.black,       // iOS shadow color.
    shadowOffset: { width: 0, height: 2 }, // Shadow direction.
    shadowOpacity: 0.1,              // Shadow transparency.
    shadowRadius: 4,                 // Shadow blur level.
    elevation: 2,                    // Android shadow depth.
  },

  // BUTTON TEXT
  buttonText: {
    color: COLORS.white,             // White text on primary color button.
    fontSize: 16,                    // Medium size.
    fontWeight: "600",               // Slightly bold.
  },

  // FOOTER SECTION FOR "Already have an account?" TEXT
  footer: {
    flexDirection: "row",            // Text + link displayed in one row.
    justifyContent: "center",        // Center horizontally.
    marginTop: 24,                   // Space above footer.
  },

  // NORMAL TEXT IN FOOTER
  footerText: {
    color: COLORS.textSecondary,     // Light grey text.
    marginRight: 5,                  // Space before clickable link.
  },

  // CLICKABLE LINK TEXT (e.g., “Login”)
  link: {
    color: COLORS.primary,           // Highlight color.
    fontWeight: "600",               // Slightly bold to look like a link.
  },
});

// Exporting the styles object so it can be imported and used in components.
export default styles;
