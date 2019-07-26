import { Component } from "@angular/core";
import { parseString } from "xml2js";
import { XmlService } from "../services/xml-service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent {
  public keys: string[];
  public fileName = "Choose file";
  private file;
  public contract = [
    { key: "CarModel", value: "" },
    { key: "YearOfManufacture", value: "" },
    { key: "EngineType", value: "" },
    { key: "EngineVolume", value: "" },
    { key: "Color", value: "" }
  ];

  constructor(
    private readonly xmlService: XmlService,
    private readonly httpClient: HttpClient
  ) {}

  public xmlParse(event): void {
    const reader = new FileReader();
    const self = this;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      this.file = file;
      reader.readAsText(file);

      reader.onload = () => {
        parseString(
          reader.result,
          (err, result) => (self.keys = self.xmlService.getXmlKeys(result))
        );
      };
    }
  }

  public sendContract(): void {
    const uplodaData = new FormData();
    uplodaData.append(this.fileName, this.file);
    uplodaData.append("contract", JSON.stringify(this.contract));
    
    this.httpClient
      .post(`http://localhost/DataMappingService/data`, uplodaData).subscribe(
        event => alert(event),
        error => alert(error.error.Message)
        );
  }
}
