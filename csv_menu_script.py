import csv


def main():
    master_dict = {}
    
    # Read master dish csv
    with open('master.csv') as master_csv:
        reader = csv.reader(master_csv)
        row_idx = 0
        for row in reader:
            if(row_idx > 0):
                master_dict[row[1]] = row

            row_idx += 1

    # read titles from new csv
    titles = []
    with open('titles.csv') as titles_csv:
        reader = csv.reader(titles_csv)
        row_idx = 0
        for row in reader:
            if(row_idx > 0):
                titles.append(row[1])

            row_idx += 1

    # Match titles from title CSV to master csv
    completed_csv = []
    for title in titles:
        master_row = master_dict.get(title)
        if(master_row):
            completed_csv.append(master_row)
        else:
            completed_csv.append(['',title])

    with open("out.csv", "w") as f:
        writer = csv.writer(f)
        header = [
            "Category",
            "Name",
            "Description",
            "Price",
            "Allergens",
            "GFP",
            "VP",
            "Table Talk Points"
        ]

        writer.writerow(header)
        writer.writerows(completed_csv)

if __name__ == "__main__":
    # execute only if run as a script
    main()