import figlet from "figlet";
import chalk from "chalk";

const logo = figlet.textSync("TEMPLATE", {
  font: "4Max",
  horizontalLayout: "default",
  verticalLayout: "default"
});

const padding = 4;

const lines = logo.split("\n");
const maxLineLength = Math.max(...lines.map((l) => l.length));
const contentWidth = maxLineLength + padding * 2;

const horizontalBorder = "─".repeat(contentWidth);

console.log("");

console.log(chalk.gray("┌" + horizontalBorder + "┐"));

for (const line of lines) {
  const rightPad = " ".repeat(maxLineLength - line.length);

  console.log(
    chalk.gray("│") +
    " ".repeat(padding) +
    chalk.magentaBright(line) +
    rightPad +
    " ".repeat(padding) +
    chalk.gray("│")
  );
}

console.log(chalk.gray("└" + horizontalBorder + "┘"));

console.log("");
