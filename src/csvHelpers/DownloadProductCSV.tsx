import { saveAs } from "file-saver";
import Papa from "papaparse";

const createProduct = [
  {
    "NAME*": "Product One",
    SLUG: "product-one",
    "CATEGORIES*": "category-one,category-two",
    "SUB CATEGORIES": "subcat-one,subcat-two",
    "DECOR SERIES*": "Series Name",
    "DECOR NUMBER*": "101",
    "RAL NUMBER": "",
    SKU: "",
    "SIZES*": "4300*1410,4300*1860",
    DESCRIPTIONS: "",
    "SHORT DESCRIPTION": "",
    "IMAGE*": "1SlazcstYGKiEPwV5ReQeah_8OqqApgSr",
    "META TITLE": "",
    "META DESCRIPTION": "",
    "META KEYWORDS": "",
    "STATUS*": "TRUE",
  },
];

const headers = [
  "NAME*",
  "SLUG",
  "CATEGORIES*",
  "SUB CATEGORIES",
  "DECOR SERIES*",
  "DECOR NUMBER*",
  "RAL NUMBER",
  "SKU",
  "SIZES*",
  "DESCRIPTIONS",
  "SHORT DESCRIPTION",
  "IMAGE*",
  "META TITLE",
  "META DESCRIPTION",
  "META KEYWORDS",
  "STATUS*",
];

const exportCSV = () => {
  // Convert data to CSV format with custom headers and BOM for Excel
  const csv = "\ufeff" + Papa.unparse(createProduct, { columns: headers });

  // Convert CSV string to Blob
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Save file using file-saver
  saveAs(blob, "crown-website-product-uploading.csv");
};

export const DownloadProductCSV = () => {
  return (
    <button className="btn btn-primary text-light" onClick={exportCSV}>
      Download CSV
    </button>
  );
};
