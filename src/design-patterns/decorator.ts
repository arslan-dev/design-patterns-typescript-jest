// decorator.ts

interface DataSource {
  writeData(data: string): void
  readData(): string
}

class FileDataSource implements DataSource {
  protected _data: string;

  constructor(filename: string) {
    this._data = '';
  }

  writeData(data: string) {
    console.log(`Writing data '${data}'`)
    this._data = data;
  }

  readData(): string {
    const data = this._data;
    console.log(`Reading data '${data}'`);
    return data; 
  }
}

class DataSourceDecorator implements DataSource {
  protected _wrappedDataSource: DataSource

  constructor(source: DataSource) {
    this._wrappedDataSource = source
  }

  writeData(data: string): void {
    this._wrappedDataSource.writeData(data)
  }

  readData(): string {
    return this._wrappedDataSource.readData()
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    data += '_encrypted';
    console.log(`encrypting... done: '${data}'`)
    super.writeData(data);
  }

  readData(): string {
    let tmp = super.readData();
    tmp = tmp.replace(/_encrypted/, '');
    console.log(`decrypting... done: '${tmp}'`)
    return tmp;
  }
}

class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    data += '_compressed';
    console.log(`compressing... done: '${data}'`)
    super.writeData(data);
  }

  readData(): string {
    let tmp = super.readData();
    tmp = tmp.replace(/_compressed/, '');
    console.log(`decompressing... done: '${tmp}'`)
    return tmp;
  }
}

const salaryRecords = 'salaryRecords';

class Application {
  dumbUsageExample() {
    let source: DataSource = new FileDataSource('some-file.dat');
    source.writeData(salaryRecords);

    source = new CompressionDecorator(source);
    source.writeData(salaryRecords);

    source = new EncryptionDecorator(source);
    source.writeData(salaryRecords);
  }
}

class SalaryManager {
  source: DataSource

  constructor(source: DataSource) {
    this.source = source
  }

  load() {
    return this.source.readData()
  }

  save() {
    this.source.writeData(salaryRecords)
  }
}

class ApplicationConfigurator {
  configurationExample(encryptionIsEnabled: boolean, compressionIsEnabled: boolean) {
    let source: DataSource = new FileDataSource("salary.dat");
    if (encryptionIsEnabled) {
      source = new EncryptionDecorator(source);
    }
    if (compressionIsEnabled) {
      source = new CompressionDecorator(source);
    }

    const logger = new SalaryManager(source);
    logger.save();
    const salary = logger.load()
  }
}

// const application = new Application();
// application.dumbUsageExample();

const applicationConfigurator = new ApplicationConfigurator();
applicationConfigurator.configurationExample(true, true);