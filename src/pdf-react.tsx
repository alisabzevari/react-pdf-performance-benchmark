import ReactPDF from "@react-pdf/renderer";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export async function pdfReact() {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const stream = await ReactPDF.renderToStream(<MyDocument />);
  return await streamToString(stream);
}

function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
