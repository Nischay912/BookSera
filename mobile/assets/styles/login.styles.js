// Importing StyleSheet and Dimensions from React Native.
// StyleSheet allows us to create structured, optimized styles for our components.
// Dimensions gives us screen width/height so we can create responsive UI that adapts to device size.
import { StyleSheet, Dimensions } from "react-native";

// Importing COLORS from our constants folder.
// This contains all theme colors used across the app. 
// Helps maintain consistency instead of using hard-coded colors.
import COLORS from "../../constants/colors";

// Extracting screen width from Dimensions API.
// Dimensions.get("window") returns the device's screen size.
// We only need width here, so we extract it from the object.
const { width } = Dimensions.get("window");

// Creating stylesheet using StyleSheet.create().
// This function improves performance by making style objects immutable and optimized.
const styles = StyleSheet.create({

  // Main scroll container of the screen.
  container: {
    flexGrow: 1,                      // Allows content to expand beyond screen and enables ScrollView.
    backgroundColor: COLORS.background, // Sets screen background color.
    padding: 20,                      // Adds spacing around the content.
    justifyContent: "center",         // Vertically centers items when content is short.
  },

  // Style applied to the ScrollView wrapper.
  scrollViewStyle: {
    flex: 1,                           // Makes ScrollView take up full available vertical space.
    backgroundColor: COLORS.background,// Ensures uniform background color.
  },

  // Container for the large top illustration.
  topIllustration: {
    alignItems: "center",             // Centers the illustration horizontally.
    width: "100%",                    // Makes container full width.
  },

  // Style for the illustration image.
  illustrationImage: {
    width: width * 0.75,              // Image width is 75% of screen width → responsive sizing.
    height: width * 0.75,             // Making height equal to width keeps it square.
  },

  // Card-style container that appears below the illustration.
  card: {
    backgroundColor: COLORS.cardBackground, // Card background color.
    borderRadius: 16,                       // Smooth rounded corners.
    padding: 24,                            // Internal spacing.
    shadowColor: COLORS.black,              // Shadow color (iOS).
    shadowOffset: { width: 0, height: 2 },  // Shadow direction.
    shadowOpacity: 0.1,                     // Light shadow.
    shadowRadius: 8,                        // Soft shadow blur.
    elevation: 4,                           // Android shadow.
    borderWidth: 2,                         // Visible border thickness.
    borderColor: COLORS.border,             // Card border color.
    marginTop: -24,                         // Negative margin pulls card upward slightly.
  },

  // Header section inside card (title + subtitle).
  header: {
    alignItems: "center",         // Centers header text.
    marginBottom: 24,             // Adds spacing below header.
  },

  // Title text (e.g. "Login", "Register").
  title: {
    fontSize: 32,                 // Large clear title.
    fontWeight: "700",            // Extra bold text.
    color: COLORS.textPrimary,    // Primary dark text.
    marginBottom: 8,              // Spacing below title.
  },

  // Subtitle or helper text under title.
  subtitle: {
    fontSize: 16,                 // Slightly smaller than title.
    color: COLORS.textSecondary,  // Lighter text color.
    textAlign: "center",          // Centers subtitle text.
  },

  // Container for the whole form.
  formContainer: {
    marginBottom: 16,             // Space below entire form section.
  },

  // Group containing each label + input.
  inputGroup: {
    marginBottom: 20,             // Adds spacing between each field.
  },

  // Label text above each input field.
  label: {
    fontSize: 14,                 // Small readable text.
    marginBottom: 8,              // Space between label and input box.
    color: COLORS.textPrimary,    // Bold readable label color.
    fontWeight: "500",            // Medium bold.
  },

  // Container that holds input field + left icon + eye icon (optional).
  inputContainer: {
    flexDirection: "row",         // Places icon + text input horizontally.
    alignItems: "center",         // Vertically aligns input and icons.
    backgroundColor: COLORS.inputBackground, // Light gray background.
    borderRadius: 12,             // Rounded corners.
    borderWidth: 1,               // Border around input field.
    borderColor: COLORS.border,   // Border color.
    paddingHorizontal: 12,        // Inner left-right padding.
  },

  // Style for the left icon inside input field.
  inputIcon: {
    marginRight: 10,              // Spacing between icon and text field.
  },

  // Actual text input box.
  input: {
    flex: 1,                      // Input expands to take all remaining horizontal space.
    height: 48,                   // Fixed height for consistency.
    color: COLORS.textDark,       // Dark text color inside input field.
  },

  // Style for the eye icon that toggles password visibility.
  eyeIcon: {
    padding: 8,                   // Touch area around icon to make it easy to tap.
  },

  // Main button style (Login/Register button).
  button: {
    backgroundColor: COLORS.primary, // Main theme color.
    borderRadius: 12,                // Rounded button shape.
    height: 50,                      // Standard button height.
    justifyContent: "center",        // Center text vertically.
    alignItems: "center",            // Center text horizontally.
    marginTop: 16,                   // Space above button.
    shadowColor: COLORS.black,       // Shadow color for iOS.
    shadowOffset: { width: 0, height: 2 }, // Shadow direction.
    shadowOpacity: 0.1,              // Faint shadow.
    shadowRadius: 4,                 // Spread/blur of shadow.
    elevation: 2,                    // Android shadow.
  },

  // Button text ("Login", "Sign Up").
  buttonText: {
    color: COLORS.white,             // White text to contrast with primary color.
    fontSize: 16,                    // Readable text size.
    fontWeight: "600",               // Slightly bold.
  },

  // Footer text section (e.g. "Don't have an account? Sign up").
  footer: {
    flexDirection: "row",           // Places footer text + link in one line.
    justifyContent: "center",       // Centers the whole section.
    marginTop: 24,                  // Space above footer.
  },

  // Normal footer text.
  footerText: {
    color: COLORS.textSecondary,    // Light grey text.
    marginRight: 5,                 // Small space between this text and link.
  },

  // "Sign up" or "Login" link text.
  link: {
    color: COLORS.primary,          // Highlighted link color.
    fontWeight: "600",              // Bold to stand out like a link.
  },
});

// Exporting the styles object so it can be used in other components.
// Without exporting, styles wouldn't be available outside this file.
export default styles;
