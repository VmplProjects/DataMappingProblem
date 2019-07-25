import { Component } from "@angular/core";
import { parseString } from "xml2js";
import { XmlService } from "../services/xml-service";
import {
  HttpClientModule,
  HttpRequest
} from "@angular/common/http";

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

  constructor(private readonly xmlService: XmlService, private readonly httpClient: HttpClientModule) {}

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
    debugger;
    const formData = new FormData();
    formData.append(this.fileName, this.file);

    const uploadReq = new HttpRequest("POST", `api/data`, formData, {
      reportProgress: true
    });

    this.httpClient.request(uploadReq).subscribe(event => {
      alert(event.type);
    });
  }
}
