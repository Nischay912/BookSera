// Importing the StyleSheet object from React Native.
// StyleSheet allows us to create optimized, structured styles 
// for components in a React Native application.
import { StyleSheet } from "react-native";

// Importing our COLORS object from a constants file.
// COLORS contains all color variables we defined in one place 
// so our whole app uses consistent colors everywhere.
import COLORS from "../../constants/colors";

// Creating a styles object using StyleSheet.create(). 
// This function ensures the styles are validated and optimized.
const styles = StyleSheet.create({

  // Main container that wraps the entire screen.
  container: {
    flex: 1,                          // Makes the container expand to fill the whole screen vertically.
    backgroundColor: COLORS.background, // Sets a global background color for the screen.
  },

  // Container used when loading animation or spinner is shown.
  loadingContainer: {
    flex: 1,                            // Takes full screen height.
    justifyContent: "center",           // Vertically centers the loader.
    alignItems: "center",               // Horizontally centers the loader.
    backgroundColor: COLORS.background, // Matches the page background.
  },

  // Container for the entire list of book posts.
  listContainer: {
    padding: 16,                        // Adds spacing around the list items.
    paddingBottom: 80,                  // Extra bottom padding so last item doesn’t hide behind bottom tabs.
  },

  // Container for header section (title + subtitle).
  header: {
    marginBottom: 20,                   // Adds spacing below header.
    alignItems: "center",               // Centers header contents horizontally.
  },

  // Style for main title in header (e.g., "Book Reviews").
  headerTitle: {
    fontSize: 24,                       // Large readable title text.
    fontFamily: "JetBrainsMono-Medium", // Custom font for stylish look.
    letterSpacing: 0.5,                 // Slight spacing between letters.
    color: COLORS.primary,              // Primary theme color.
    marginBottom: 8,                    // Space below the title before subtitle.
  },

  // Style for small text under the title.
  headerSubtitle: {
    fontSize: 14,                       // Smaller text size.
    color: COLORS.textSecondary,        // Light grey color.
    textAlign: "center",                // Align subtitle centrally.
  },

  // Card container for each individual book post.
  bookCard: {
    backgroundColor: COLORS.cardBackground, // Card background color.
    borderRadius: 16,                       // Smooth rounded corners.
    marginBottom: 20,                       // Space between cards.
    padding: 16,                            // Inner spacing so content doesn’t touch edges.
    shadowColor: COLORS.black,              // iOS shadow color.
    shadowOffset: { width: 0, height: 2 },  // Shadow direction (downwards).
    shadowOpacity: 0.1,                     // Light shadow transparency.
    shadowRadius: 8,                        // Soft shadow blur.
    elevation: 3,                           // Android shadow level.
    borderWidth: 1,                         // Slight border around the card.
    borderColor: COLORS.border,             // Border color.
  },

  // Top row of card containing user info + menu options.
  bookHeader: {
    flexDirection: "row",           // Places items horizontally.
    justifyContent: "space-between",// User section left, menu icon right.
    alignItems: "center",           // Vertically centers them.
    marginBottom: 12,               // Space below header before image.
  },

  // Container for user avatar + username.
  userInfo: {
    flexDirection: "row",           // Avatar and name appear side-by-side.
    alignItems: "center",           // Vertically aligns avatar and text.
  },

  // Style for user profile image in post.
  avatar: {
    width: 36,                      // Fixed width of avatar.
    height: 36,                     // Fixed height of avatar.
    borderRadius: 18,               // Makes the image perfectly circular.
    marginRight: 10,                // Space between avatar and username.
  },

  // Username text styling.
  username: {
    fontSize: 15,                   // Medium readable text.
    fontWeight: "600",              // Semi-bold username.
    color: COLORS.textPrimary,      // Main text color.
  },

  // Container for the book image.
  bookImageContainer: {
    width: "100%",                  // Full width of card.
    height: 200,                    // Fixed height.
    borderRadius: 12,               // Rounded edges.
    overflow: "hidden",             // Ensures image respects rounded corners.
    marginBottom: 12,               // Space below image.
    backgroundColor: COLORS.border, // Grey placeholder behind the image.
  },

  // Actual image styling inside container.
  bookImage: {
    width: "100%",                  // Fill container horizontally.
    height: "100%",                 // Fill container vertically.
  },

  // Container for all text content below the image.
  bookDetails: {
    padding: 4,                     // Slight padding for cleaner spacing.
  },

  // Book title styling inside each card.
  bookTitle: {
    fontSize: 18,                   // Bigger title text.
    fontWeight: "700",              // Bold text.
    color: COLORS.textPrimary,      // Strong readable color.
    marginBottom: 6,                // Spacing below book title.
  },

  // Container for stars rating.
  ratingContainer: {
    flexDirection: "row",           // Stars appear in a row.
    marginBottom: 8,                // Space below the stars.
  },

  // Caption or description written by user.
  caption: {
    fontSize: 14,                   // Normal text size.
    color: COLORS.textDark,         // Darker text.
    marginBottom: 8,                // Space below caption.
    lineHeight: 20,                 // Better readability for multi-line text.
  },

  // Date text for "Posted on 12 Jan 2025" etc.
  date: {
    fontSize: 12,                   // Small text.
    color: COLORS.textSecondary,    // Grey color.
  },

  // Container for empty screen (if no books found).
  emptyContainer: {
    alignItems: "center",           // Center horizontally.
    justifyContent: "center",       // Center vertically.
    padding: 40,                    // Space around text and icon.
    marginTop: 40,                  // Push empty view slightly downward.
  },

  // Large title when there is no content.
  emptyText: {
    fontSize: 18,                   // Large text.
    fontWeight: "600",              // Semi-bold.
    color: COLORS.textPrimary,      // Main color.
    marginTop: 16,                  // Space above text (after the icon).
    marginBottom: 8,                // Space below the main empty title.
  },

  // Small description text under emptyText.
  emptySubtext: {
    fontSize: 14,                   // Standard small text.
    color: COLORS.textSecondary,    // Light colored.
    textAlign: "center",            // Center text for aesthetic.
  },

  // Loader style when fetching more items at bottom.
  footerLoader: {
    marginVertical: 20,             // Space above and below loader.
  },
});

// Exporting the styles so that other components can import and use them.
// Without this export, the styles object cannot be accessed from other files.
export default styles;
